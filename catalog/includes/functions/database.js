/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2013 osCommerce

  Released under the GNU General Public License
*/

// https://github.com/felixge/node-mysql   Protocol reimplemented in js
// http://nodejsdb.org/db-mysql/    native extension C++ extension, requires pkg node-waf
// http://sannis.github.io/node-mysql-libmysqlclient/  asynchronous and synchronous

// new global var connection;
// old global link is just ignored
// STORE_DB_TRANSACTIONS ignored
//
// DEPENDENCIES:
// tep_sanitize_string -> general

/*****************  FUTURE complete rewrite of logic for callbacks **************************/
/* query has to get a callback * /
/* perform action insert should return insertID */
/* perform action update should return affected rows */
/* perform query should return fetched array */ 
/* obsolete: db_num_rows : just take length of array */
/* obsolete: db_fetch_fields: never needed */
/* obsolete: db_free_result: never needed */

/*****************  FIRST APPROACH **************************/

/* query returns everything 
tep_db_fetch_array(db_query)
tep_db_num_rows(db_query)
tep_db_insert_id(db_query)
tep_db_affected_rows(db_query)
*/

if (typeof DEBUG == "undefined") DEBUG = true;
if (typeof CLASS == "undefined") CLASS = true;
if (typeof TRACE == "undefined") TRACE = true;
if (typeof PRINT == "undefined") PRINT = console.log;
if (typeof DIR_WS_FUNCTIONS == "undefined") DIR_WS_FUNCTIONS = 'includes/functions/';

////// export NODE_PATH=/usr/lib/node_modules
var mysql = require('mysql-libmysqlclient')
var fs  = require('fs');

eval(fs.readFileSync(DIR_WS_FUNCTIONS +'../configure.js').toString());
eval(fs.readFileSync(DIR_WS_FUNCTIONS +'../database_tables.js').toString());
function tep_sanitize_string(s){return s.trim().replace(/ +/g,' ').replace(/[<>]/g,'_')}

var connection = mysql.createConnectionSync() // GLOBAL

function tep_db_connect(){
	var c = connection.connectSync(DB_SERVER,DB_SERVER_USERNAME,DB_SERVER_PASSWORD,DB_DATABASE)
	connection.setCharsetSync('utf8')
	return c}
function tep_db_close(){return connection.closeSync()}
function tep_db_query(queryString){PRINT("SQL QUERY: "+queryString);return connection.querySync(queryString)}
function tep_db_error(query, errno)
{ 
   console.log('ERROR: [' + errno + '] ' + query);
   print('<font color="#000000"><strong>' + errno + ' - ' + error + '<br /><br />' + query + '<br /><br /><small><font color="#ff0000">[TEP STOP]</font></small><br /><br /></strong></font>');
}

function tep_db_fetch_array(db_query)	{return db_query.fetchAllSync()}
function tep_db_num_rows(db_query)		{return db_query.numRowsSync()}
function tep_db_insert_id(db_query)		{return connection.lastInsertIdSync()}
function tep_db_affected_rows(db_query)	{return connection.affectedRowsSync()}

function tep_db_insert(table, data, parameters)
{
    var query = 'insert into ' + table + ' (';
    for (var i in data) {
        query += i.column + ', ';
    }
    query = query.slice(0, -2) + ') values (';
    for (var i in data) {
        switch (i.value.toString) {
            case 'now()':
                query += 'now(), ';
                break;
            case 'null':
                query += 'null, ';
                break;
            default:
                query += "'" + tep_db_input(value) + "', ";
                break;
        }
    }
    query = query.slice(0, -2) + ')';
    return r = tep_db_query(query);
 }


function tep_db_update(table, data, parameters){
    var query = 'update ' + table + ' set ';
    for (var i in data) {
        switch (i.value.toString) {
            case 'now()':
                query += i.columns + ' = now(), ';
                break;
            case 'null':
                query += i.columns += ' = null, ';
                break;
            default:
                query += i.columns + " = '" + tep_db_input(value) + "', ";
                break;
        }
    }
    query = query.slice(0, -2) + ' where ' + parameters;
    return r = tep_db_query(query);
}

function tep_db_perform(table, data, action, parameters)
{
    if (action == 'insert') {
        return tep_db_insert(table, data, parameters)
    }
    if (action == 'update') {
        return tep_db_update(table, data, parameters)
    }
}


function tep_db_get_server_info() {return connection.getInfoSync()['server_info']}
function tep_db_output(string){return htmlspecialchars(string)}
function tep_db_input(string){return connection.escapeSync(string)}
function tep_db_prepare_input(string)
{
    if (typeof string === 'string'){
        return tep_sanitize_string(stripslashes(string)).trim()
    } else if (typeof string === 'object'){
        for (var i in string) {
            string[i.key] = tep_db_prepare_input(i.value);
        }
        return string;
    } else {
        return string;
    }
}

/*
if (DEBUG) {
	tep_db_connect()
	var queryString = 'SELECT * FROM products'
	var a = tep_db_query(queryString)
	tep_db_fetch_array(a)
	PRINT(tep_db_num_rows(a))
	tep_db_close()
}*/
