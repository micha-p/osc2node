/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/

expected_query = tep_db_query('select p.products_id, pd.products_name, products_date_available as date_expected from ' 
							+ TABLE_PRODUCTS 
							+ ' p, ' 
							+ TABLE_PRODUCTS_DESCRIPTION 
							+ ' pd where to_days(products_date_available) >= to_days(now()) and p.products_id = pd.products_id and pd.language_id = \'' 
							+ languages_id 
							+ '\' order by ' 
							+ EXPECTED_PRODUCTS_FIELD 
							+ ' ' 
							+ EXPECTED_PRODUCTS_SORT 
							+ ' limit ' 
							+ MAX_DISPLAY_UPCOMING_PRODUCTS);

if (tep_db_num_rows(expected_query) > 0) {
    print("")
    print('  <div class="ui-widget infoBoxContainer">')
    print('    <div class="ui-widget-header ui-corner-top infoBoxHeading">')
    print("      <span>")
    
    print(TABLE_HEADING_UPCOMING_PRODUCTS);
    print("</span>")
    print('      <span style="float: right;">')
    
    print(TABLE_HEADING_DATE_EXPECTED);
    print("</span>")
    print("    </div>")
    print("")
    print('    <div class="ui-widget-content ui-corner-bottom">')
    print('      <table border="0" width="100%" cellspacing="0" cellpadding="2" class="productListTable">')
    print("")
    
    while (expected = tep_db_fetch_array(expected_query)) {
        print('        <tr>' 
		        + '\n' 
		        + '          <td><a href="' 
		        + tep_href_link(FILENAME_PRODUCT_INFO, 'products_id=' 
		        + expected['products_id']) 
		        + '">' 
		        + expected['products_name'] 
		        + '</a></td>' 
		        + '\n' 
		        + '          <td align="right">' 
		        + tep_date_short(expected['date_expected']) 
		        + '</td>' 
		        + '\n' 
		        + '        </tr>' 
		        + '\n');
    }
    print("")
    print("      </table>")
    print("    </div>")
    print("  </div>")
    print("")
    print("")

}
