/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/
/* TODO 
if (messageStack.size('header') > 0) {
    print('<div class="grid_24">' + messageStack.output('header') + '</div>');
}*/
print('')
print('<div id="header" class="grid_24">')
print('  <div id="storeLogo">')

print('<a href="' + tep_href_link(FILENAME_DEFAULT) + '">' + tep_image(DIR_WS_IMAGES + 'store_logo.png', STORE_NAME) + '</a>');
print('</div>')
print('')
print('  <div id="headerShortcuts">')
print('')

// TODO print(tep_draw_button(HEADER_TITLE_CART_CONTENTS + (cart.count_contents() > 0 ? ' (' + cart.count_contents() + ')' : ''), 'cart', tep_href_link(FILENAME_SHOPPING_CART)) + tep_draw_button(HEADER_TITLE_CHECKOUT, 'triangle-1-e', tep_href_link(FILENAME_CHECKOUT_SHIPPING, '', 'SSL')) + tep_draw_button(HEADER_TITLE_MY_ACCOUNT, 'person', tep_href_link(FILENAME_ACCOUNT, '', 'SSL')));

/* TODO
if (tep_session_is_registered('customer_id')) {
    print(tep_draw_button(HEADER_TITLE_LOGOFF, null, tep_href_link(FILENAME_LOGOFF, '', 'SSL')));
}*/

print('  </div>')
print('')
print('<script type="text/javascript">')
print('  $("#headerShortcuts").buttonset();')
print('</script>')
print('</div>')
print('')
print('<div class="grid_24 ui-widget infoBoxContainer">')
print('  <div class="ui-widget-header infoBoxHeading">')
print('&nbsp;&nbsp;' + breadcrumb.trail(' &raquo; '))
print('</div>')
print('</div>')
print('')
print('')

if (HTTP_GET_VARS['error_message'] && tep_not_null(HTTP_GET_VARS['error_message'])) {
    print('<table border="0" width="100%" cellspacing="0" cellpadding="2">')
    print('  <tr class="headerError">')
    print('    <td class="headerError">')
    
    print(htmlspecialchars(stripslashes(urldecode(HTTP_GET_VARS['error_message']))));
    print('</td>')
    print('  </tr>')
    print('</table>')
    print('')

}
if (HTTP_GET_VARS['info_message'] && tep_not_null(HTTP_GET_VARS['info_message'])) {
    print('<table border="0" width="100%" cellspacing="0" cellpadding="2">')
    print('  <tr class="headerInfo">')
    print('    <td class="headerInfo">')
    
    print(htmlspecialchars(stripslashes(urldecode(HTTP_GET_VARS['info_message']))));
    print('</td>')
    print('  </tr>')
    print('</table>')
    print('')

}
