/*

- collect some source files into modules or classes invoked once at server start
- change database access to asynchronous style
- check global variables

*/

if (typeof DEBUG == "undefined") DEBUG = true;
if (typeof CLASS == "undefined") CLASS = false;
if (typeof TRACE == "undefined") TRACE = true;
if (typeof PRINT == "undefined") PRINT = console.log;

// http://eloquentjavascript.net/20_node.html
// globals
var HTTP_GET_VARS
var HTTP_POST_VARS
var HTTP_COOKIE_VARS
var HTTP_SESSION_VARS
var HTTP_POST_FILES
var HTTP_SERVER_VARS
var RESPONSE


// Changed globals!! request_type -> HTTP_SERVER_VARS['REQUEST_TYPE'] HTTP_SERVER_VARS['PHP_SELF']


// Instances of the classes shoppingCart, currencies, lng, oscTemplate, breadcrumb, messageStack are created globally in application_top 
// and should be passed around explicitly
//
// other application globals are set in application top and should be stored in HTTP_SESSION_VARS
// language languages_id currency cPath cPath_array current_category_id
// 
// configuration is evaluated into top namespace in application top also !!
//
//
// html output is done from template top to bottom and within modules
// however: boxmodules just return strings
//
// all output should be collected before shipping:
//		- to push cookies via header
//		- set page title
//		- measure transferred size
//		- do a redirect instead

/* other locally defined globals:

application top: cPath cPath_array current_category_id
index: category_depth catname
*/

var http = require("http"), fs = require("fs"), path = require('path')
var url= require("url"), querystring=require('querystring'), mime=require("mime")
var methods = Object.create(null);

// GLOBAL functions used all over application

var session_started = false
var SID = false

function print(s){
	if(typeof s == 'string'){
	   RESPONSE.write(s); 
	   RESPONSE.write('\n')
	}
}


http.createServer(function(request, response) {

  function respond(code, body, type) {
    if (!type) type = "text/plain";
    response.writeHead(code, {"Content-Type": type});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
  }
    
  if (request.method in methods){
    var t = Date.now()
  	 var p = urlToPath(request.url)
  	 var q = urlToQuery(request.url)
    HTTP_SERVER_VARS = request.headers  // http://php.net/manual/en/reserved.variables.server.php
    HTTP_SERVER_VARS['PHP_SELF']=''
    HTTP_SERVER_VARS['SCRIPT_NAME']=''
    HTTP_SERVER_VARS['REQUEST_URI']= request.url
    HTTP_SERVER_VARS['HTTPS'] = false // TODO
    HTTP_SERVER_VARS['REQUEST_TYPE'] = HTTP_SERVER_VARS['HTTPS'] && 'SSL'  || 'NONSSL'
    HTTP_SERVER_VARS['REQUEST_METHOD']= request.method
    HTTP_SERVER_VARS['REQUEST_TIME']= t
    RESPONSE=response
    response.writeHead(200, {"Content-Type": "text/html"})
    // as header is sent before doing the page, redirection is impossible at the moment
    methods[request.method](p, q, response, respond, request)
    console.log(request.method + " " + (Date.now() - t)/1000 + " " + request.url)
  }
  else
  { 
    response.writeHead(405, {"Content-Type": "text/plain"})
    response.end(request.method + " Method Not Allowed")
  }
}).listen(8000);
console.log("Listening at http://localhost:8000")

function urlToPath(u) {     // TODO security
  var path = url.parse(u).pathname
  return "." + decodeURIComponent(path)
}

function urlToQuery(u) {return url.parse(u).query}
function urlToGetVars(u) {return querystring.parse(u)}


methods.GET = function(p, query, response, respond) {

	HTTP_GET_VARS = querystring.parse(query)
	HTTP_POST_VARS = []
	eval(fs.readFileSync('includes/configure.js').toString())
	DIR_FS_CATALOG = process.cwd()
	eval(fs.readFileSync('includes/phpjs_toplevel.js').toString())

   if (DEBUG) PRINT(p)
   DEBUG = false;
	switch(p){
	case './':
	case './index':
	case './index.php':
      HTTP_SERVER_VARS['PHP_SELF']=path.basename(p)
      eval(fs.readFileSync(DIR_WS_INCLUDES + 'application_top.js').toString())
//      eval(fs.readFileSync(p+ '.init.js').toString())
      if (typeof language == "undefined") language = 'english';
      eval(fs.readFileSync(DIR_WS_LANGUAGES + language + '/index').toString())
      eval(fs.readFileSync('index').toString())
      // TODO 
      // index(HTTP_GET_VARS, HTTP_COOKIE_VARS, HTTP_SESSION_VARS, HTTP_SERVER_VARS)
      // TODO level 2
      // result=index(...)
      // response.write(s); 
      eval(fs.readFileSync(DIR_WS_INCLUDES + 'template_bottom.js').toString())
      eval(fs.readFileSync(DIR_WS_INCLUDES + 'application_bottom.js').toString())
      response.end('\n');
    	break
   case './product_info':
   case './products_new':
   case './specials':
   case './shopping_cart':
   case './advanced_search':
   case './advanced_search_result':
   case './reviews':
   case './product_reviews':
   case './product_reviews_info':
   case './privacy':
   case './conditions':
   case './contact_us':
   case './shipping':
      DEBUG = false;
      HTTP_SERVER_VARS['PHP_SELF']=path.basename(p)
      eval(fs.readFileSync(DIR_WS_INCLUDES + 'application_top.js').toString())
//      eval(fs.readFileSync(p+ '.init.js').toString())
      if (typeof language == "undefined") language = 'english';
      eval(fs.readFileSync(DIR_WS_LANGUAGES + language + '/' + path.basename(p)).toString())
//      eval(fs.readFileSync(DIR_WS_INCLUDES + 'template_top.js').toString())
      eval(fs.readFileSync(p).toString())
      eval(fs.readFileSync(DIR_WS_INCLUDES + 'template_bottom.js').toString())
      eval(fs.readFileSync(DIR_WS_INCLUDES + 'application_bottom.js').toString())
      response.end('\n');
      break
   default:
   	fs.stat(p, function(error, stats) {
   							if (error && error.code == "ENOENT")  respond(404, "404 (File not found)");
		                  else if (error) respond(500, error.toString())
		                       else if (stats.isDirectory()) fs.readdir(p, function(error, files) {
		                                                                                if (error) respond(500, error.toString())
		                                                                                else       respond(200, files.join("\n"))})
		                            else respond(200, fs.createReadStream(p), mime.lookup(p))})
		                                 
	}
}
