/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2014 osCommerce

  Released under the GNU General Public License
*/

var PHP_VERSION = 6
// global HTTP_GET_VARS, HTTP_POST_VARS, HTTP_COOKIE_VARS;


function tep_session_start()
{
    sane_session_id = true;
    if (HTTP_GET_VARS[tep_session_name()]) {
        if (SESSION_FORCE_COOKIE_USE == 'True' || preg_match('/^[a-zA-Z0-9,-]+$/', HTTP_GET_VARS[tep_session_name()]) == false) {
            unset(HTTP_GET_VARS[tep_session_name()]);
            sane_session_id = false;
        }
    }
    if (HTTP_POST_VARS[tep_session_name()]) {
        if (SESSION_FORCE_COOKIE_USE == 'True' || preg_match('/^[a-zA-Z0-9,-]+$/', HTTP_POST_VARS[tep_session_name()]) == false) {
            unset(HTTP_POST_VARS[tep_session_name()]);
            sane_session_id = false;
        }
    }
    if (HTTP_COOKIE_VARS[tep_session_name()]) {
        if (preg_match('/^[a-zA-Z0-9,-]+$/', HTTP_COOKIE_VARS[tep_session_name()]) == false) {
            session_data = session_get_cookie_params();
            setcookie(tep_session_name(), '', time() - 42000, session_data['path'], session_data['domain']);
            unset(HTTP_COOKIE_VARS[tep_session_name()]);
            sane_session_id = false;
        }
    }
    if (sane_session_id == false) {
        tep_redirect(tep_href_link(FILENAME_DEFAULT, '', 'NONSSL', false));
    }
    register_shutdown_function('session_write_close');
    return session_start();
}


function tep_session_register(variable)
{
    if (session_started == true) {
        if (PHP_VERSION < 4.3) {
            return session_register(variable);
        } else {
            if (!GLOBALS[variable]) {
                GLOBALS[variable] = null;
            }
            _SESSION[variable] =& GLOBALS[variable];
        }
    }
    return false;
}
function tep_session_is_registered(variable)
{
    if (PHP_VERSION < 4.3) {
        return session_is_registered(variable);
    } else {
        return _SESSION && array_key_exists(variable, _SESSION);
    }
}
function tep_session_unregister(variable)
{
    if (PHP_VERSION < 4.3) {
        return session_unregister(variable);
    } else {
        unset(_SESSION[variable]);
    }
}
function tep_session_id(sessid /* : ''*/)
{
    if (!empty(sessid)) {
        return session_id(sessid);
    } else {
        return session_id();
    }
}
function tep_session_name(name /* : ''*/)
{
    if (!empty(name)) {
        return session_name(name);
    } else {
        return session_name();
    }
}
function tep_session_close()
{
    if (PHP_VERSION >= '4.0.4') {
        return session_write_close();
    } else if (function_exists('session_close')) {
        return session_close();
    }
}
function tep_session_destroy()
{
    if (HTTP_COOKIE_VARS[tep_session_name()]) {
        session_data = session_get_cookie_params();
        setcookie(tep_session_name(), '', time() - 42000, session_data['path'], session_data['domain']);
        unset(HTTP_COOKIE_VARS[tep_session_name()]);
    }
    return session_destroy();
}
function tep_session_save_path(path /* : ''*/)
{
    if (!empty(path)) {
        return session_save_path(path);
    } else {
        return session_save_path();
    }
}
function tep_session_recreate()
{
    if (PHP_VERSION >= 5.1) {
        old_id = session_id();
        session_regenerate_id(true);
        if (!empty(SID)) {
            SID = tep_session_name() + '=' + tep_session_id();
        }
        tep_whos_online_update_session_id(old_id, tep_session_id());
    }
}
