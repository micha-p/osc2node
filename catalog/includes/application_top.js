/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2014 osCommerce

  Released under the GNU General Public License
*/

var cPath 					// global line 402 = HTTP_GET_VARS['cPath'];
var cPath_array 			// global line 407 = tep_parse_category_path(cPath);
								// global line 408 cPath = implode('_', cPath_array);
var current_category_id // global line 409 = cPath_array[sizeof(cPath_array) - 1];

if (HTTP_SERVER_VARS['REQUEST_TYPE'] == 'NONSSL') 	{var DIR_WS_CATALOG = DIR_WS_HTTP_CATALOG} 
else 																{var DIR_WS_CATALOG = DIR_WS_HTTPS_CATALOG}

// include the list of project filenames
eval(fs.readFileSync(DIR_WS_INCLUDES + 'filenames.js').toString())
// include the list of project database tables
eval(fs.readFileSync(DIR_WS_INCLUDES + 'database_tables.js').toString())
// include the database functions
eval(fs.readFileSync(DIR_WS_FUNCTIONS + 'database.js').toString())

// make a connection to the database... now
tep_db_connect() || process.exit('Unable to connect to database server!');

// set the application parameters
var configuration = tep_db_fetch_array(tep_db_query('select configuration_key as cfgKey, configuration_value as cfgValue from ' + TABLE_CONFIGURATION));
// conf is loaded into global namespace!!
for (k in configuration){
	var cnf = configuration[k].cfgKey
	var val = configuration[k].cfgValue
	if (DEBUG) PRINT('CONF ' + k + ': ' + cnf + '->' + val)
	global[cnf]=val
}


/* TODO
if (SEARCH_ENGINE_FRIENDLY_URLS == 'true') {
    if (strlen(getenv('PATH_INFO')) > 1) {
        GET_array = {};
        PHP_SELF = str_replace(getenv('PATH_INFO'), '', PHP_SELF);
        vars = explode('/', substr(getenv('PATH_INFO'), 1));
        do_magic_quotes_gpc(vars);
        for (i = 0, n = sizeof(vars); i < n; i++) {
            if (strpos(vars[i], '[]')) {
                GET_array[substr(vars[i], 0, -2)][] = vars[i + 1];
            } else {
                HTTP_GET_VARS[vars[i]] = vars[i + 1];
            }
            i++;
        }
        if (sizeof(GET_array) > 0) {
            while (list(key, value) = each(GET_array)) {
                HTTP_GET_VARS[key] = value;
            }
        }
    }
}
*/

// define general functions used application-wide
eval(fs.readFileSync(DIR_WS_FUNCTIONS + 'general.js').toString())
eval(fs.readFileSync(DIR_WS_FUNCTIONS + 'html_output.js').toString())

// set the cookie domain
// cookie_domain = request_type == 'NONSSL' &&  HTTP_COOKIE_DOMAIN  || HTTPS_COOKIE_DOMAIN;
// cookie_path = request_type == 'NONSSL' &&  HTTP_COOKIE_PATH  || HTTPS_COOKIE_PATH;

// include shopping cart class
// eval(fs.readFileSync(DIR_WS_CLASSES + 'shopping_cart.js').toString())
// include navigation history class
// eval(fs.readFileSync(DIR_WS_CLASSES + 'navigation_history.js').toString())

// define how the session functions will be used
// eval(fs.readFileSync(DIR_WS_FUNCTIONS + 'sessions.js').toString())

// replacement TODO
function tep_session_is_registered(variable) {return false}
function tep_session_register(variable) {return true}

// set the session name and save path
// tep_session_name('osCsid');
// tep_session_save_path(SESSION_WRITE_DIRECTORY);

// set the session cookie parameters
/*
if (function_exists('session_set_cookie_params')) {
    session_set_cookie_params(0, cookie_path, cookie_domain);
} else if (function_exists('ini_set')) {
    ini_set('session.cookie_lifetime', '0');
    ini_set('session.cookie_path', cookie_path);
    ini_set('session.cookie_domain', cookie_domain);
}
*/

// TODO @ini_set('session.use_only_cookies', SESSION_FORCE_COOKIE_USE == 'True' &&  1  || 0);
// set the session ID if it exists

/* TODO
if (SESSION_FORCE_COOKIE_USE == 'False') {
    if (HTTP_GET_VARS[tep_session_name()] && (!HTTP_COOKIE_VARS[tep_session_name()] || HTTP_COOKIE_VARS[tep_session_name()] != HTTP_GET_VARS[tep_session_name()])) {
        tep_session_id(HTTP_GET_VARS[tep_session_name()]);
    } else if (HTTP_POST_VARS[tep_session_name()] && (!HTTP_COOKIE_VARS[tep_session_name()] || HTTP_COOKIE_VARS[tep_session_name()] != HTTP_POST_VARS[tep_session_name()])) {
        tep_session_id(HTTP_POST_VARS[tep_session_name()]);
    }
}*/

// start the session
/* TODO session_started = false;
if (SESSION_FORCE_COOKIE_USE == 'True') {
    tep_setcookie('cookie_test', 'please_accept_for_session', time() + 60 * 60 * 24 * 30, cookie_path, cookie_domain);
    if (HTTP_COOKIE_VARS['cookie_test']) {
        tep_session_start();
        session_started = true;
    }
} else if (SESSION_BLOCK_SPIDERS == 'True') {
    user_agent = strtolower(getenv('HTTP_USER_AGENT'));
    spider_flag = false;
    if (tep_not_null(user_agent)) {
        spiders = file(DIR_WS_INCLUDES + 'spiders.txt');
        for (i = 0, n = sizeof(spiders); i < n; i++) {
            if (tep_not_null(spiders[i])) {
                if (is_integer(strpos(user_agent, trim(spiders[i])))) {
                    spider_flag = true;
                    break;
                }
            }
        }
    }
    if (spider_flag == false) {
        tep_session_start();
        session_started = true;
    }
} else {
    tep_session_start();
    session_started = true;
}

if (session_started == true && PHP_VERSION >= 4.3 && function_exists('ini_get') && ini_get('register_globals') == false) {
    extract(_SESSION, EXTR_OVERWRITE + EXTR_REFS);
}
// initialize a session token
if (!tep_session_is_registered('sessiontoken')) {
    sessiontoken = md5(tep_rand() + tep_rand() + tep_rand() + tep_rand());
    tep_session_register('sessiontoken');
}*/

// set SID once, even if empty
// TODO SID = defined('SID') &&  SID  || '';

// verify the ssl_session_id if the feature is enabled
/* TODO
if (request_type == 'SSL' && SESSION_CHECK_SSL_SESSION_ID == 'True' && ENABLE_SSL == true && session_started == true) {
    ssl_session_id = getenv('SSL_SESSION_ID');
    if (!tep_session_is_registered('SSL_SESSION_ID')) {
        SESSION_SSL_ID = ssl_session_id;
        tep_session_register('SESSION_SSL_ID');
    }
    if (SESSION_SSL_ID != ssl_session_id) {
        tep_session_destroy();
        tep_redirect(tep_href_link(FILENAME_SSL_CHECK));
    }
}*/


// verify the browser user agent if the feature is enabled
/* TODO
if (SESSION_CHECK_USER_AGENT == 'True') {
    http_user_agent = getenv('HTTP_USER_AGENT');
    if (!tep_session_is_registered('SESSION_USER_AGENT')) {
        SESSION_USER_AGENT = http_user_agent;
        tep_session_register('SESSION_USER_AGENT');
    }
    if (SESSION_USER_AGENT != http_user_agent) {
        tep_session_destroy();
        tep_redirect(tep_href_link(FILENAME_LOGIN));
    }
}*/

// verify the IP address if the feature is enabled
/* TODO 
if (SESSION_CHECK_IP_ADDRESS == 'True') {
    ip_address = tep_get_ip_address();
    if (!tep_session_is_registered('SESSION_IP_ADDRESS')) {
        SESSION_IP_ADDRESS = ip_address;
        tep_session_register('SESSION_IP_ADDRESS');
    }
    if (SESSION_IP_ADDRESS != ip_address) {
        tep_session_destroy();
        tep_redirect(tep_href_link(FILENAME_LOGIN));
    }
}*/

// create the shopping cart
/* TODO  if (!tep_session_is_registered('cart') || !is_object(cart)) {
    tep_session_register('cart');
    cart = new shoppingCart();
}*/


if (TRACE) PRINT('CURRENCIES START')
// include currencies class and create an instance
eval(fs.readFileSync(DIR_WS_CLASSES + 'currencies.js').toString())
currencies = new currencyclass;
if (TRACE) PRINT('CURRENCIES DONE')

// include the mail classes
/* TODO 
var DIR_WS_CLASSES + 'mime.php' = require(DIR_WS_CLASSES + 'mime.php');
var DIR_WS_CLASSES + 'email.php' = require(DIR_WS_CLASSES + 'email.php');
*/

if (TRACE) PRINT('LANGUAGE START')
eval(fs.readFileSync(DIR_WS_CLASSES + 'language.js').toString())
if (!tep_session_is_registered('language') || HTTP_GET_VARS['language']) {
    if (!tep_session_is_registered('language')) {
        tep_session_register('language');
        tep_session_register('languages_id');
    }
    lng = new languageclass();
    if (HTTP_GET_VARS['language'] && tep_not_null(HTTP_GET_VARS['language'])) {
        lng.set_language(HTTP_GET_VARS['language']);
    } else {
        lng.get_browser_language();
    }
    language = lng.language['directory'];
    languages_id = lng.language['id'];
}

if (TRACE) PRINT('LANGUAGE END')

// include the language translations
// TODO _system_locale_numeric = setlocale(LC_NUMERIC, 0)

if (TRACE) PRINT(DIR_WS_LANGUAGES + language + '.js' + ' LOADED')
eval(fs.readFileSync(DIR_WS_LANGUAGES + language + '.js').toString())

// setlocale(LC_NUMERIC, _system_locale_numeric);
// Prevent LC_ALL from setting LC_NUMERIC to a locale with 1,0 float/decimal values instead of 1.0 (see bug #634)
// currency

if (!tep_session_is_registered('currency') || HTTP_GET_VARS['currency'] || USE_DEFAULT_LANGUAGE_CURRENCY == 'true' && LANGUAGE_CURRENCY != currency) {
    if (!tep_session_is_registered('currency')) { tep_session_register('currency')}
    if (HTTP_GET_VARS['currency'] && currencies.is_set(HTTP_GET_VARS['currency'])) {
        currency = HTTP_GET_VARS['currency'];
    } else {
        currency = USE_DEFAULT_LANGUAGE_CURRENCY == 'true' && currencies.is_set(LANGUAGE_CURRENCY) &&  LANGUAGE_CURRENCY  || DEFAULT_CURRENCY;
    }
}

// navigation history
/* TODO
if (!tep_session_is_registered('navigation') || !is_object(navigation)) {
    tep_session_register('navigation');
    navigation = new navigationHistory();
}
navigation.add_current_page();
*/


// action recorder
/* TODO var 'includes/classes/action_recorder.php' = include('includes/classes/action_recorder.php'); */

// Shopping cart actions

if (HTTP_GET_VARS['action']) {
    // redirect the customer to a friendly cookie-must-be-enabled page if cookies are disabled
    if (session_started == false) {
        tep_redirect(tep_href_link(FILENAME_COOKIE_USAGE));
    }
    if (DISPLAY_CART == 'true') {
        goto = FILENAME_SHOPPING_CART;
        parameters = ['action', 'cPath', 'products_id', 'pid'];
    } else {
        goto = PHP_SELF;
        if (HTTP_GET_VARS['action'] == 'buy_now') {
            parameters = ['action', 'pid', 'products_id'];
        } else {
            parameters = ['action', 'pid'];
        }
    }
    switch (HTTP_GET_VARS['action']) {
        // customer wants to update the product quantity in their shopping cart
        case 'update_product':
            for (i = 0, n = sizeof(HTTP_POST_VARS['products_id']); i < n; i++) {
                if (in_array(HTTP_POST_VARS['products_id'][i], is_array(HTTP_POST_VARS['cart_delete']) &&  HTTP_POST_VARS['cart_delete']  || {})) {
                    cart.remove(HTTP_POST_VARS['products_id'][i]);
                } else {
                    attributes = HTTP_POST_VARS['id'][HTTP_POST_VARS['products_id'][i]] &&  HTTP_POST_VARS['id'][HTTP_POST_VARS['products_id'][i]]  || '';
                    cart.add_cart(HTTP_POST_VARS['products_id'][i], HTTP_POST_VARS['cart_quantity'][i], attributes, false);
                }
            }
            tep_redirect(tep_href_link(goto, tep_get_all_get_params(parameters)));
            break;
        // customer adds a product from the products page
        case 'add_product':
            if (HTTP_POST_VARS['products_id'] && is_numeric(HTTP_POST_VARS['products_id'])) {
                attributes = HTTP_POST_VARS['id'] &&  HTTP_POST_VARS['id']  || '';
                cart.add_cart(HTTP_POST_VARS['products_id'], cart.get_quantity(tep_get_uprid(HTTP_POST_VARS['products_id'], attributes)) + 1, attributes);
            }
            tep_redirect(tep_href_link(goto, tep_get_all_get_params(parameters)));
            break;
        // customer removes a product from their shopping cart
        case 'remove_product':
            if (HTTP_GET_VARS['products_id']) {
                cart.remove(HTTP_GET_VARS['products_id']);
            }
            tep_redirect(tep_href_link(goto, tep_get_all_get_params(parameters)));
            break;
        // performed by the 'buy now' button in product listings and review page
        case 'buy_now':
            if (HTTP_GET_VARS['products_id']) {
                if (tep_has_product_attributes(HTTP_GET_VARS['products_id'])) {
                    tep_redirect(tep_href_link(FILENAME_PRODUCT_INFO, 'products_id=' + HTTP_GET_VARS['products_id']));
                } else {
                    cart.add_cart(HTTP_GET_VARS['products_id'], cart.get_quantity(HTTP_GET_VARS['products_id']) + 1);
                }
            }
            tep_redirect(tep_href_link(goto, tep_get_all_get_params(parameters)));
            break;
        case 'notify':
            if (tep_session_is_registered('customer_id')) {
                if (HTTP_GET_VARS['products_id']) {
                    notify = HTTP_GET_VARS['products_id'];
                } else if (HTTP_GET_VARS['notify']) {
                    notify = HTTP_GET_VARS['notify'];
                } else if (HTTP_POST_VARS['notify']) {
                    notify = HTTP_POST_VARS['notify'];
                } else {
                    tep_redirect(tep_href_link(PHP_SELF, tep_get_all_get_params(['action', 'notify'])));
                }
                if (!is_array(notify)) {
                    notify = [notify];
                }
                for (i = 0, n = sizeof(notify); i < n; i++) {
                    check_query = tep_db_query('select count(*) as count from ' + TABLE_PRODUCTS_NOTIFICATIONS + ' where products_id = \'' + notify[i] + '\' and customers_id = \'' + customer_id + '\'');
                    check = tep_db_fetch_array(check_query);
                    if (check['count'] < 1) {
                        tep_db_query('insert into ' + TABLE_PRODUCTS_NOTIFICATIONS + ' (products_id, customers_id, date_added) values (\'' + notify[i] + '\', \'' +  customer_id + '\', now())');
                    }
                }
                tep_redirect(tep_href_link(PHP_SELF, tep_get_all_get_params(['action', 'notify'])));
            } else {
                navigation.set_snapshot();
                tep_redirect(tep_href_link(FILENAME_LOGIN, '', 'SSL'));
            }
            break;
        case 'notify_remove':
            if (tep_session_is_registered('customer_id') && HTTP_GET_VARS['products_id']) {
                check_query = tep_db_query('select count(*) as count from ' + TABLE_PRODUCTS_NOTIFICATIONS + ' where products_id = \'' + HTTP_GET_VARS['products_id'] + '\' and customers_id = \'' + customer_id + '\'');
                check = tep_db_fetch_array(check_query);
                if (check['count'] > 0) {
                    tep_db_query('delete from ' + TABLE_PRODUCTS_NOTIFICATIONS + ' where products_id = \'' + HTTP_GET_VARS['products_id'] + '\' and customers_id = \'' + customer_id + '\'');
                }
                tep_redirect(tep_href_link(PHP_SELF, tep_get_all_get_params(['action'])));
            } else {
                navigation.set_snapshot();
                tep_redirect(tep_href_link(FILENAME_LOGIN, '', 'SSL'));
            }
            break;
        case 'cust_order':
            if (tep_session_is_registered('customer_id') && HTTP_GET_VARS['pid']) {
                if (tep_has_product_attributes(HTTP_GET_VARS['pid'])) {
                    tep_redirect(tep_href_link(FILENAME_PRODUCT_INFO, 'products_id=' + HTTP_GET_VARS['pid']));
                } else {
                    cart.add_cart(HTTP_GET_VARS['pid'], cart.get_quantity(HTTP_GET_VARS['pid']) + 1);
                }
            }
            tep_redirect(tep_href_link(goto, tep_get_all_get_params(parameters)));
            break;
    }
}


// include the who's online functions
// TODO var DIR_WS_FUNCTIONS + 'whos_online.php' = require(DIR_WS_FUNCTIONS + 'whos_online.php');
// TODO tep_update_whos_online();
// include the password crypto functions
// TODO var DIR_WS_FUNCTIONS + 'password_funcs.php' = require(DIR_WS_FUNCTIONS + 'password_funcs.php');
// include validation functions (right now only email address)
// TODO var DIR_WS_FUNCTIONS + 'validations.php' = require(DIR_WS_FUNCTIONS + 'validations.php');

eval(fs.readFileSync(DIR_WS_CLASSES + 'split_page_results.js').toString())
eval(fs.readFileSync(DIR_WS_CLASSES + 'boxes.js').toString())
eval(fs.readFileSync(DIR_WS_FUNCTIONS + 'banner.js').toString())
eval(fs.readFileSync(DIR_WS_FUNCTIONS + 'specials.js').toString())

if (TRACE) PRINT('OSCTEMPLATE START')
eval(fs.readFileSync(DIR_WS_CLASSES + 'osc_template.js').toString())
oscTemplate = new oscTemplateclass;
if (TRACE) PRINT('OSCTEMPLATE END')

// calculate category path
if (HTTP_GET_VARS['cPath']) {
    cPath = HTTP_GET_VARS['cPath'];
} else if (HTTP_GET_VARS['products_id'] && !HTTP_GET_VARS['manufacturers_id']) {
          cPath = tep_get_product_path(HTTP_GET_VARS['products_id']);
       } else {
          cPath = '';
       }

if (TRACE) PRINT('CPATH old:'+cPath)
if (tep_not_null(cPath)) {
    cPath_array = tep_parse_category_path(cPath);
    cPath = implode('_', cPath_array);
    current_category_id = cPath_array[sizeof(cPath_array) - 1];
} else {
    current_category_id = 0;
}
if (TRACE) PRINT('CPATH new:'+cPath)
if (TRACE) PRINT('cPath_array:')
if (TRACE) console.dir(cPath_array)
if (TRACE) PRINT('current_category_id:' + current_category_id)


// include the breadcrumb class and start the breadcrumb trail
if (TRACE) PRINT('BREADCRUMB START')
eval(fs.readFileSync(DIR_WS_CLASSES + 'breadcrumb.js').toString())
breadcrumb = new breadcrumbclass();
breadcrumb.add(HEADER_TITLE_TOP, HTTP_SERVER);
breadcrumb.add(HEADER_TITLE_CATALOG, tep_href_link(FILENAME_DEFAULT));
if (TRACE) PRINT('BREADCRUMB END')


// add category names or the manufacturer name to the breadcrumb trail
if (typeof cPath_array != 'undefined') {
    for (i = 0, n = cPath_array.length; i < n; i++) {
        categories_query = tep_db_query('select categories_name from ' + TABLE_CATEGORIES_DESCRIPTION + ' where categories_id = \'' + cPath_array[i] + '\' and language_id = \'' + languages_id + '\'');
        if (tep_db_num_rows(categories_query) > 0) {
            categories = tep_db_fetch_array(categories_query)[0]
            breadcrumb.add(categories['categories_name'], 
                           tep_href_link(FILENAME_DEFAULT, 'cPath=' + implode('_', cPath_array.slice(0, i + 1))))
        } else {
            break;
        }
    }
} else if (HTTP_GET_VARS['manufacturers_id']) {
    manufacturers_query = tep_db_query('select manufacturers_name from ' + TABLE_MANUFACTURERS + ' where manufacturers_id = \'' + HTTP_GET_VARS['manufacturers_id'] + '\'');
    if (tep_db_num_rows(manufacturers_query)) {
        manufacturers = tep_db_fetch_array(manufacturers_query);
        breadcrumb.add(manufacturers['manufacturers_name'], tep_href_link(FILENAME_DEFAULT, 'manufacturers_id=' + HTTP_GET_VARS['manufacturers_id']));
    }
}

// add the products model to the breadcrumb trail
if (HTTP_GET_VARS['products_id']) {
    model_query = tep_db_query('select products_model from ' + TABLE_PRODUCTS + ' where products_id = \'' + HTTP_GET_VARS['products_id'] + '\'');
    if (tep_db_num_rows(model_query)) {
        model = tep_db_fetch_array(model_query);
        breadcrumb.add(model['products_model'], tep_href_link(FILENAME_PRODUCT_INFO, 'cPath=' + cPath + '&products_id=' + HTTP_GET_VARS['products_id']));
    }
}

// initialize the message stack for output messages


if (TRACE) PRINT('MESSAGESTACK START')
eval(fs.readFileSync(DIR_WS_CLASSES + 'message_stack.js').toString())
messageStack = new messageStackclass();
if (TRACE) PRINT('MESSAGESTACK END')

if (TRACE) {PRINT('APPLICATION_TOP DONE cPath: ' + cPath);}
