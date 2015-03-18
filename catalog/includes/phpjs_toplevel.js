/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2012 osCommerce

  Released under the GNU General Public License
*/
////
// Recursively handle magic_quotes_gpc turned off.
// This is due to the possibility of have an array in
// $HTTP_xxx_VARS
// Ie, products attributes



function is_numeric(x){typeof x == 'number'}
function is_float(x){typeof x == 'number'}


function do_magic_quotes_gpc(ar){
	process.exit("not implemented")
}

// set default timezone if none exists (PHP 5.3 throws an E_WARNING)
/* skipped */


function checkdnsrr(host, type){
	process.exit("not implemented")
}

var phpjs = require('phpjs')

function htmlspecialchars(s, quote_style, charset, double_encode){ 
	if (typeof s == 'undefined') return ''
	else 								  return phpjs.htmlspecialchars(s, quote_style, charset, double_encode)
}


var nl2br=phpjs.nl2br
var strlen=phpjs.strlen
var strstr=phpjs.strstr
// var strtr=phpjs.strtr
var strpos=phpjs.strpos
var strrpos=phpjs.strrpos
var stripos=phpjs.stripos
var substr=phpjs.substr
var trim=phpjs.trim
var sprintf=phpjs.sprintf
var basename = phpjs.basename
var addslashes=phpjs.addslashes
var stripslashes=phpjs.stripslashes

function strtolower(s)			{if (typeof s == 'string') return s.toLowerCase()
                               else strtolower(s.toString())}
function strtoupper(s)			{if (typeof s == 'string') return s.toUpperCase()
                               else strtoupper(s.toString())}

function strtr(s,pairs){  /* TODO */
    var out=s
    for (k in pairs){out=out.replace(k,pairs[k])}
    return out}


var number_format = phpjs.number_format
var implode = phpjs.implode
var explode = phpjs.explode
var date = phpjs.date
var ceil = Math.ceil
var floor = Math.floor
var max = phpjs.max
var round = phpjs.round
var intval = phpjs.intval
var in_array = phpjs.in_array
var empty = phpjs.empty
var sizeof = phpjs.count

function is_string(s) { return (typeof s == 'string')}
function is_array(s) { return (typeof s == 'object' || typeof s == 'array')}
