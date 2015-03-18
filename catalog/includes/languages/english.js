/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2013 osCommerce

  Released under the GNU General Public License
*/
// look in your $PATH_LOCALE/locale directory for available locales
// or type locale -a on the server.
// Examples:
// on RedHat try 'en_US'
// on FreeBSD try 'en_US.ISO_8859-1'
// on Windows try 'en', or 'English'
// TODO @setlocale(LC_ALL, {'en_US.UTF-8', 'en_US.UTF8', 'enu_usa'});
var DATE_FORMAT_SHORT = '%m/%d/%Y';
// this is used for strftime()
var DATE_FORMAT_LONG = '%A %d %B, %Y';
// this is used for strftime()
var DATE_FORMAT = 'm/d/Y';
// this is used for date()
var DATE_TIME_FORMAT = DATE_FORMAT_SHORT + ' %H:%M:%S';
var JQUERY_DATEPICKER_I18N_CODE = '';
// leave empty for en_US; see http://jqueryui.com/demos/datepicker/#localization
var JQUERY_DATEPICKER_FORMAT = 'mm/dd/yy';
// see http://docs.jquery.com/UI/Datepicker/formatDate
////
// Return date in raw format
// $date should be in format mm/dd/yyyy
// raw date is in format YYYYMMDD, or DDMMYYYY
function tep_date_raw(date, reverse)
{
    if (reverse) {
        return substr(date, 3, 2) + substr(date, 0, 2) + substr(date, 6, 4);
    } else {
        return substr(date, 6, 4) + substr(date, 0, 2) + substr(date, 3, 2);
    }
}
// if USE_DEFAULT_LANGUAGE_CURRENCY is true, use the following currency, instead of the applications default currency (used when changing language)
var LANGUAGE_CURRENCY = 'USD';
// Global entries for the <html> tag
var HTML_PARAMS = 'dir="ltr" lang="en"';
// charset for web pages and emails
var CHARSET = 'utf-8';
// page title
var TITLE = STORE_NAME;
// header text in includes/header.php
var HEADER_TITLE_CREATE_ACCOUNT = 'Create an Account';
var HEADER_TITLE_MY_ACCOUNT = 'My Account';
var HEADER_TITLE_CART_CONTENTS = 'Cart Contents';
var HEADER_TITLE_CHECKOUT = 'Checkout';
var HEADER_TITLE_TOP = 'Top';
var HEADER_TITLE_CATALOG = 'Catalog';
var HEADER_TITLE_LOGOFF = 'Log Off';
var HEADER_TITLE_LOGIN = 'Log In';
// footer text in includes/footer.php
var FOOTER_TEXT_REQUESTS_SINCE = 'requests since';
// text for gender
var MALE = 'Male';
var FEMALE = 'Female';
var MALE_ADDRESS = 'Mr.';
var FEMALE_ADDRESS = 'Ms.';
// text for date of birth example
var DOB_FORMAT_STRING = 'mm/dd/yyyy';
// checkout procedure text
var CHECKOUT_BAR_DELIVERY = 'Delivery Information';
var CHECKOUT_BAR_PAYMENT = 'Payment Information';
var CHECKOUT_BAR_CONFIRMATION = 'Confirmation';
var CHECKOUT_BAR_FINISHED = 'Finished!';
// pull down default text
var PULL_DOWN_DEFAULT = 'Please Select';
var TYPE_BELOW = 'Type Below';
// javascript messages
var JS_ERROR = 'Errors have occured during the process of your form.\\n\\nPlease make the following corrections:\\n\\n';
var JS_REVIEW_TEXT = '* The \'Review Text\' must have at least ' + REVIEW_TEXT_MIN_LENGTH + ' characters.\\n';
var JS_REVIEW_RATING = '* You must rate the product for your review.\\n';
var JS_ERROR_NO_PAYMENT_MODULE_SELECTED = '* Please select a payment method for your order.\\n';
var JS_ERROR_SUBMITTED = 'This form has already been submitted. Please press Ok and wait for this process to be completed.';
var ERROR_NO_PAYMENT_MODULE_SELECTED = 'Please select a payment method for your order.';
var CATEGORY_COMPANY = 'Company Details';
var CATEGORY_PERSONAL = 'Your Personal Details';
var CATEGORY_ADDRESS = 'Your Address';
var CATEGORY_CONTACT = 'Your Contact Information';
var CATEGORY_OPTIONS = 'Options';
var CATEGORY_PASSWORD = 'Your Password';
var ENTRY_COMPANY = 'Company Name:';
var ENTRY_COMPANY_TEXT = '';
var ENTRY_GENDER = 'Gender:';
var ENTRY_GENDER_ERROR = 'Please select your Gender.';
var ENTRY_GENDER_TEXT = '*';
var ENTRY_FIRST_NAME = 'First Name:';
var ENTRY_FIRST_NAME_ERROR = 'Your First Name must contain a minimum of ' + ENTRY_FIRST_NAME_MIN_LENGTH + ' characters.';
var ENTRY_FIRST_NAME_TEXT = '*';
var ENTRY_LAST_NAME = 'Last Name:';
var ENTRY_LAST_NAME_ERROR = 'Your Last Name must contain a minimum of ' + ENTRY_LAST_NAME_MIN_LENGTH + ' characters.';
var ENTRY_LAST_NAME_TEXT = '*';
var ENTRY_DATE_OF_BIRTH = 'Date of Birth:';
var ENTRY_DATE_OF_BIRTH_ERROR = 'Your Date of Birth must be in this format: MM/DD/YYYY (eg 05/21/1970)';
var ENTRY_DATE_OF_BIRTH_TEXT = '* (eg. 05/21/1970)';
var ENTRY_EMAIL_ADDRESS = 'E-Mail Address:';
var ENTRY_EMAIL_ADDRESS_ERROR = 'Your E-Mail Address must contain a minimum of ' + ENTRY_EMAIL_ADDRESS_MIN_LENGTH + ' characters.';
var ENTRY_EMAIL_ADDRESS_CHECK_ERROR = 'Your E-Mail Address does not appear to be valid - please make any necessary corrections.';
var ENTRY_EMAIL_ADDRESS_ERROR_EXISTS = 'Your E-Mail Address already exists in our records - please log in with the e-mail address or create an account with a different address.';
var ENTRY_EMAIL_ADDRESS_TEXT = '*';
var ENTRY_STREET_ADDRESS = 'Street Address:';
var ENTRY_STREET_ADDRESS_ERROR = 'Your Street Address must contain a minimum of ' + ENTRY_STREET_ADDRESS_MIN_LENGTH + ' characters.';
var ENTRY_STREET_ADDRESS_TEXT = '*';
var ENTRY_SUBURB = 'Suburb:';
var ENTRY_SUBURB_TEXT = '';
var ENTRY_POST_CODE = 'Post Code:';
var ENTRY_POST_CODE_ERROR = 'Your Post Code must contain a minimum of ' + ENTRY_POSTCODE_MIN_LENGTH + ' characters.';
var ENTRY_POST_CODE_TEXT = '*';
var ENTRY_CITY = 'City:';
var ENTRY_CITY_ERROR = 'Your City must contain a minimum of ' + ENTRY_CITY_MIN_LENGTH + ' characters.';
var ENTRY_CITY_TEXT = '*';
var ENTRY_STATE = 'State/Province:';
var ENTRY_STATE_ERROR = 'Your State must contain a minimum of ' + ENTRY_STATE_MIN_LENGTH + ' characters.';
var ENTRY_STATE_ERROR_SELECT = 'Please select a state from the States pull down menu.';
var ENTRY_STATE_TEXT = '*';
var ENTRY_COUNTRY = 'Country:';
var ENTRY_COUNTRY_ERROR = 'You must select a country from the Countries pull down menu.';
var ENTRY_COUNTRY_TEXT = '*';
var ENTRY_TELEPHONE_NUMBER = 'Telephone Number:';
var ENTRY_TELEPHONE_NUMBER_ERROR = 'Your Telephone Number must contain a minimum of ' + ENTRY_TELEPHONE_MIN_LENGTH + ' characters.';
var ENTRY_TELEPHONE_NUMBER_TEXT = '*';
var ENTRY_FAX_NUMBER = 'Fax Number:';
var ENTRY_FAX_NUMBER_TEXT = '';
var ENTRY_NEWSLETTER = 'Newsletter:';
var ENTRY_NEWSLETTER_TEXT = '';
var ENTRY_NEWSLETTER_YES = 'Subscribed';
var ENTRY_NEWSLETTER_NO = 'Unsubscribed';
var ENTRY_PASSWORD = 'Password:';
var ENTRY_PASSWORD_ERROR = 'Your Password must contain a minimum of ' + ENTRY_PASSWORD_MIN_LENGTH + ' characters.';
var ENTRY_PASSWORD_ERROR_NOT_MATCHING = 'The Password Confirmation must match your Password.';
var ENTRY_PASSWORD_TEXT = '*';
var ENTRY_PASSWORD_CONFIRMATION = 'Password Confirmation:';
var ENTRY_PASSWORD_CONFIRMATION_TEXT = '*';
var ENTRY_PASSWORD_CURRENT = 'Current Password:';
var ENTRY_PASSWORD_CURRENT_TEXT = '*';
var ENTRY_PASSWORD_CURRENT_ERROR = 'Your Password must contain a minimum of ' + ENTRY_PASSWORD_MIN_LENGTH + ' characters.';
var ENTRY_PASSWORD_NEW = 'New Password:';
var ENTRY_PASSWORD_NEW_TEXT = '*';
var ENTRY_PASSWORD_NEW_ERROR = 'Your new Password must contain a minimum of ' + ENTRY_PASSWORD_MIN_LENGTH + ' characters.';
var ENTRY_PASSWORD_NEW_ERROR_NOT_MATCHING = 'The Password Confirmation must match your new Password.';
var PASSWORD_HIDDEN = '--HIDDEN--';
var FORM_REQUIRED_INFORMATION = '* Required information';
// constants for use in tep_prev_next_display function
var TEXT_RESULT_PAGE = 'Result Pages:';
var TEXT_DISPLAY_NUMBER_OF_PRODUCTS = 'Displaying <strong>%d</strong> to <strong>%d</strong> (of <strong>%d</strong> products)';
var TEXT_DISPLAY_NUMBER_OF_ORDERS = 'Displaying <strong>%d</strong> to <strong>%d</strong> (of <strong>%d</strong> orders)';
var TEXT_DISPLAY_NUMBER_OF_REVIEWS = 'Displaying <strong>%d</strong> to <strong>%d</strong> (of <strong>%d</strong> reviews)';
var TEXT_DISPLAY_NUMBER_OF_PRODUCTS_NEW = 'Displaying <strong>%d</strong> to <strong>%d</strong> (of <strong>%d</strong> new products)';
var TEXT_DISPLAY_NUMBER_OF_SPECIALS = 'Displaying <strong>%d</strong> to <strong>%d</strong> (of <strong>%d</strong> specials)';
var PREVNEXT_TITLE_FIRST_PAGE = 'First Page';
var PREVNEXT_TITLE_PREVIOUS_PAGE = 'Previous Page';
var PREVNEXT_TITLE_NEXT_PAGE = 'Next Page';
var PREVNEXT_TITLE_LAST_PAGE = 'Last Page';
var PREVNEXT_TITLE_PAGE_NO = 'Page %d';
var PREVNEXT_TITLE_PREV_SET_OF_NO_PAGE = 'Previous Set of %d Pages';
var PREVNEXT_TITLE_NEXT_SET_OF_NO_PAGE = 'Next Set of %d Pages';
var PREVNEXT_BUTTON_FIRST = '&lt;&lt;FIRST';
var PREVNEXT_BUTTON_PREV = '[&lt;&lt;&nbsp;Prev]';
var PREVNEXT_BUTTON_NEXT = '[Next&nbsp;&gt;&gt;]';
var PREVNEXT_BUTTON_LAST = 'LAST&gt;&gt;';
var IMAGE_BUTTON_ADD_ADDRESS = 'Add Address';
var IMAGE_BUTTON_ADDRESS_BOOK = 'Address Book';
var IMAGE_BUTTON_BACK = 'Back';
var IMAGE_BUTTON_BUY_NOW = 'Buy Now';
var IMAGE_BUTTON_CHANGE_ADDRESS = 'Change Address';
var IMAGE_BUTTON_CHECKOUT = 'Checkout';
var IMAGE_BUTTON_CONFIRM_ORDER = 'Confirm Order';
var IMAGE_BUTTON_CONTINUE = 'Continue';
var IMAGE_BUTTON_CONTINUE_SHOPPING = 'Continue Shopping';
var IMAGE_BUTTON_DELETE = 'Delete';
var IMAGE_BUTTON_EDIT_ACCOUNT = 'Edit Account';
var IMAGE_BUTTON_HISTORY = 'Order History';
var IMAGE_BUTTON_LOGIN = 'Sign In';
var IMAGE_BUTTON_IN_CART = 'Add to Cart';
var IMAGE_BUTTON_NOTIFICATIONS = 'Notifications';
var IMAGE_BUTTON_QUICK_FIND = 'Quick Find';
var IMAGE_BUTTON_REMOVE_NOTIFICATIONS = 'Remove Notifications';
var IMAGE_BUTTON_REVIEWS = 'Reviews';
var IMAGE_BUTTON_SEARCH = 'Search';
var IMAGE_BUTTON_SHIPPING_OPTIONS = 'Shipping Options';
var IMAGE_BUTTON_TELL_A_FRIEND = 'Tell a Friend';
var IMAGE_BUTTON_UPDATE = 'Update';
var IMAGE_BUTTON_UPDATE_CART = 'Update Cart';
var IMAGE_BUTTON_WRITE_REVIEW = 'Write Review';
var SMALL_IMAGE_BUTTON_DELETE = 'Delete';
var SMALL_IMAGE_BUTTON_EDIT = 'Edit';
var SMALL_IMAGE_BUTTON_VIEW = 'View';
var ICON_ARROW_RIGHT = 'more';
var ICON_CART = 'In Cart';
var ICON_ERROR = 'Error';
var ICON_SUCCESS = 'Success';
var ICON_WARNING = 'Warning';
var TEXT_GREETING_PERSONAL = 'Welcome back <span class="greetUser">%s!</span> Would you like to see which <a href="%s"><u>new products</u></a> are available to purchase?';
var TEXT_GREETING_PERSONAL_RELOGON = '<small>If you are not %s, please <a href="%s"><u>log yourself in</u></a> with your account information.</small>';
var TEXT_GREETING_GUEST = 'Welcome <span class="greetUser">Guest!</span> Would you like to <a href="%s"><u>log yourself in</u></a>? Or would you prefer to <a href="%s"><u>create an account</u></a>?';
var TEXT_SORT_PRODUCTS = 'Sort products ';
var TEXT_DESCENDINGLY = 'descendingly';
var TEXT_ASCENDINGLY = 'ascendingly';
var TEXT_BY = ' by ';
var TEXT_REVIEW_BY = 'by %s';
var TEXT_REVIEW_WORD_COUNT = '%s words';
var TEXT_REVIEW_RATING = 'Rating: %s [%s]';
var TEXT_REVIEW_DATE_ADDED = 'Date Added: %s';
var TEXT_NO_REVIEWS = 'There are currently no product reviews.';
var TEXT_NO_NEW_PRODUCTS = 'There are currently no products.';
var TEXT_UNKNOWN_TAX_RATE = 'Unknown tax rate';
var TEXT_REQUIRED = '<span class="errorText">Required</span>';
var ERROR_TEP_MAIL = '<font face="Verdana, Arial" size="2" color="#ff0000"><strong><small>TEP ERROR:</small> Cannot send the email through the specified SMTP server. Please check your php.ini setting and correct the SMTP server if necessary.</strong></font>';
var TEXT_CCVAL_ERROR_INVALID_DATE = 'The expiry date entered for the credit card is invalid. Please check the date and try again.';
var TEXT_CCVAL_ERROR_INVALID_NUMBER = 'The credit card number entered is invalid. Please check the number and try again.';
var TEXT_CCVAL_ERROR_UNKNOWN_CARD = 'The first four digits of the number entered are: %s. If that number is correct, we do not accept that type of credit card. If it is wrong, please try again.';
var FOOTER_TEXT_BODY = 'Copyright &copy; ' + date('Y') + ' <a href="' + tep_href_link(FILENAME_DEFAULT) + '">' + STORE_NAME + '</a><br />Powered by <a href="http://www.oscommerce.com" target="_blank">osCommerce</a>';
