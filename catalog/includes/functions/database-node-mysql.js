/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2013 osCommerce

  Released under the GNU General Public License
*/

// https://github.com/felixge/node-mysql   Protocol reimplemented in js
// http://nodejsdb.org/db-mysql/    native extension C++ extension, requires pkg node-waf

// new global var connection;
// old global link is just ignored
// STORE_DB_TRANSACTIONS ignored
//
// most functions work on results from query
// affected rows are stored in the last query!!!
//
// DEPENDENCIES:
// stripslashes (PHPjs)
// htmlspecialchars (PHPjs)
// tep_sanitize_string -> general

/*****************  complete rewrite of other logic neccessary **************************/
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


////// export NODE_PATH=/usr/lib/node_modules
var mysql = require('mysql');
var fs  = require('fs');
eval(fs.readFileSync('./htmlspecialchars.js').toString());
eval(fs.readFileSync('./stripslashes.js').toString());
eval(fs.readFileSync('../configure.js').toString());
eval(fs.readFileSync('../database_tables.js').toString());
function tep_sanitize_string(s){return s.trim().replace(/ +/g,' ').replace(/[<>]/g,'_')}

var connection // GLOBAL

////////////////////////////////
var print = console.log
////////////////////////////////

function tep_db_connect()
{
  connection = void 0
  connection = mysql.createConnection({
     host     : DB_SERVER,
     user     : DB_SERVER_USERNAME,
     password : DB_SERVER_PASSWORD,
     database : DB_DATABASE,
     charset  : 'utf8'
     // port
  });
  var a = connection.connect(function(err) {
                         if (err) console.log(err);
                     });
  return true
}

function tep_db_close(){return connection.end(function(err){delete connection.config; return !err})}
function tep_db_error(query, errno)
{
   console.log('ERROR: [' + errno + '] ' + query);
   print('<font color="#000000"><strong>' + errno + ' - ' + error + '<br /><br />' + query + '<br /><br /><small><font color="#ff0000">[TEP STOP]</font></small><br /><br /></strong></font>');
}

function tep_db_query(queryString)
{
    // console.log('start')
    var result = connection.query(queryString, function(err, rows, fields) {
                                              // console.log('callback start')
                                              if (err) {tep_db_error(queryString, err)}
			                                     // if (callback) {callback(rows)}
                                              // console.log('callback end')
                                              return true
                                          })
    // console.log('end')
    return result
}

function tep_db_fetch_array(db_query) {return db_query['_results'][0] }
function tep_db_num_rows(db_query){return db_query['_results'][0].length}
function tep_db_insert_id(db_query){return db_query['_results'][0]['insertId']}
function tep_db_affected_rows(db_query){return db_query['_results'][0]['affectedRows']}


tep_db_connect()
function cycle(rows){for (var i in rows) {console.log(i, rows[i].products_model)}}
var queryString = 'SELECT * FROM products'
var a = tep_db_query(queryString)
tep_db_fetch_array(a)
tep_db_num_rows(a)
tep_db_close()


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
    var r = tep_db_query(query);
    return r._results[0].insertId
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
    var r = tep_db_query(query);
    return r._results[0].affectedRows
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


function tep_db_get_server_info(link) {return connection._protocol._handshakeInitializationPacket.serverVersion}
function tep_db_output(string){return php.htmlspecialchars(string)}
function tep_db_input(string, link){return connection.escape(string)}
function tep_db_prepare_input(string)
{
    if (typeof string === 'string'){
        return tep_sanitize_string(php.stripslashes(string)).trim()
    } else if (typeof string === 'object'){
        for (var i in string) {
            string[i.key] = tep_db_prepare_input(i.value);
        }
        return string;
    } else {
        return string;
    }
}


tep_db_connect()
var a = tep_db_query('INSERT INTO  products (products_model, products_price) VALUES (\"magic new\",333.22)')
tep_db_insert_id(a)
tep_db_affected_rows(a)
tep_db_get_server_info()
tep_db_close()


