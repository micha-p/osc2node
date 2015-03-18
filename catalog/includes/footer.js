/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/

// TODO var counter = require(DIR_WS_INCLUDES + 'counter.php');;

print('')
print('<div class="grid_24 footer">')
print('  <p align="center">')
print(FOOTER_TEXT_BODY);
print('</p>')
print('</div>')
print('')
print('')

/* TODO
if (banner = tep_banner_exists('dynamic', 'footer')) {
    print('')
    print('<div class="grid_24" style="text-align: center; padding-bottom: 20px;">')
    print('  ')   
    print(tep_display_banner('static', banner));
    print('</div>')
    print('')
    print('')
}*/

print('')
print('<script type="text/javascript">')
print("$('.productListTable tr:nth-child(even)').addClass('alt');")
print('</script>')
print('')
