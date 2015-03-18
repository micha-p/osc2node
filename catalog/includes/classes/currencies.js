/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2013 osCommerce

  Released under the GNU General Public License
*/
////
// Class to handle currencies
// TABLES: currencies


var currency  // GLOBAL for currency

if (typeof DEBUG == "undefined") DEBUG = true;
if (typeof CLASS == "undefined") CLASS = true;
if (typeof TRACE == "undefined") TRACE = true;
if (typeof PRINT == "undefined") PRINT = console.log;


if (DEBUG) {
   fs = require('fs')
   PRINT(global.process.argv[1])
   if (typeof DIR_WS_FUNCTIONS == "undefined") DIR_WS_FUNCTIONS = 'includes/functions/';
	eval(fs.readFileSync(DIR_WS_FUNCTIONS + '../configure.js').toString());
	eval(fs.readFileSync(DIR_WS_FUNCTIONS + '../database_tables.js').toString());
	eval(fs.readFileSync(DIR_WS_FUNCTIONS + './database.js').toString());
	eval(fs.readFileSync(DIR_WS_FUNCTIONS + './general.js').toString());
	eval(fs.readFileSync(DIR_WS_FUNCTIONS + './compatibility.js').toString());
}



function currencyclass() { // CLASS
	    

    // CONSTRUCTOR START
    this.currencies = {}
    var currencies_query = tep_db_query('select code, title, symbol_left, symbol_right, decimal_point, thousands_point, decimal_places, value from ' + TABLE_CURRENCIES);
    var currencies_array = tep_db_fetch_array(currencies_query)
    for (c in currencies_array) {
       	   var ca=currencies_array[c]
        	   if (DEBUG) PRINT('CURRENCY ' + c + ': ' + ca['code'])
            this.currencies[ca['code']] = {'title' : ca['title'], 
                                          'symbol_left' : ca['symbol_left'], 
                                          'symbol_right' : ca['symbol_right'], 
                                          'decimal_point' : ca['decimal_point'], 
                                          'thousands_point' : ca['thousands_point'], 
                                          'decimal_places' : ca['decimal_places'], 
                                          'value' : ca['value']};
    }
    // CONSTRUCTOR END 

    this.format = function(number, calculate_currency_value /* : true*/, currency_type /* : ''*/, currency_value /* : ''*/)
    {
        currency_type = currency_type || currency;
        if (calculate_currency_value == true) {
            rate = tep_not_null(currency_value) &&  currency_value  || this.currencies[currency_type]['value'];
            format_string = this.currencies[currency_type]['symbol_left'] 
                          + number_format(tep_round(number * rate, 
                                                    this.currencies[currency_type]['decimal_places']), 
                                                    this.currencies[currency_type]['decimal_places'], 
                                                    this.currencies[currency_type]['decimal_point'], 
                                                    this.currencies[currency_type]['thousands_point']) 
                          + this.currencies[currency_type]['symbol_right'];
        } else {
            format_string = this.currencies[currency_type]['symbol_left'] 
                          + number_format(tep_round(number, 
                                                    this.currencies[currency_type]['decimal_places']), 
                                                    this.currencies[currency_type]['decimal_places'], 
                                                    this.currencies[currency_type]['decimal_point'], 
                                                    this.currencies[currency_type]['thousands_point']) 
                          + this.currencies[currency_type]['symbol_right'];
        }
        return format_string;
    }
    this.calculate_price = function(products_price, products_tax, quantity)
    {
         return tep_round(tep_add_tax(products_price, products_tax), this.currencies[currency]['decimal_places']) * (quantity || 1);
    }
    this.is_set =function(code)
    {
        if (this.currencies[code] && tep_not_null(this.currencies[code])) {
            return true;
        } else {
            return false;
        }
    }
    this.get_value=function(code)
    {
        return this.currencies[code]['value'];
    }
    this.get_decimal_places=function(code)
    {
        return this.currencies[code]['decimal_places'];
    }
    this.display_price=function display_price(products_price, products_tax, quantity)
    {
        return this.format(this.calculate_price(products_price, products_tax, quantity || 1));
    }
}

/*
if (DEBUG) {
	PRINT(tep_db_connect())
	var cn=new currencies
	DISPLAY_PRICE_WITH_TAX=true
	currency='USD'
	PRINT(cn.display_price(15.22,14,2))
	currency='EUR'
	PRINT(cn.display_price(100,20))
	tep_db_close()
}*/