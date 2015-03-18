/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2014 osCommerce

  Released under the GNU General Public License
*/


listing_split = new splitPageResults(listing_sql, MAX_DISPLAY_SEARCH_RESULTS, 'p.products_id');
print("")
print("  <div class=\"contentText\">")
print("")
print("")

if (listing_split.number_of_rows > 0 && (PREV_NEXT_BAR_LOCATION == '1' || PREV_NEXT_BAR_LOCATION == '3')) {
    print("")
    print("    <div>")
    print("      <span style=\"float: right;\">")
    
    print(TEXT_RESULT_PAGE + ' ' + listing_split.display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(['page', 'info', 'x', 'y'])));
    print("</span>")
    print("")
    print("      <span>")
    
    print(listing_split.display_count(TEXT_DISPLAY_NUMBER_OF_PRODUCTS));
    print("</span>")
    print("    </div>")
    print("")
    print("    <br />")
    print("")
    print("")

}
prod_list_contents = '<div class="ui-widget infoBoxContainer">' 
+ '  <div class="ui-widget-header ui-corner-top infoBoxHeading">' 
+ '    <table border="0" width="100%" cellspacing="0" cellpadding="2" class="productListingHeader">' + '      <tr>';
for (col = 0, n = sizeof(column_list); col < n; col++) {
    lc_align = '';
    switch (column_list[col]) {
        case 'PRODUCT_LIST_MODEL':
            lc_text = TABLE_HEADING_MODEL;
            lc_align = '';
            break;
        case 'PRODUCT_LIST_NAME':
            lc_text = TABLE_HEADING_PRODUCTS;
            lc_align = '';
            break;
        case 'PRODUCT_LIST_MANUFACTURER':
            lc_text = TABLE_HEADING_MANUFACTURER;
            lc_align = '';
            break;
        case 'PRODUCT_LIST_PRICE':
            lc_text = TABLE_HEADING_PRICE;
            lc_align = 'right';
            break;
        case 'PRODUCT_LIST_QUANTITY':
            lc_text = TABLE_HEADING_QUANTITY;
            lc_align = 'right';
            break;
        case 'PRODUCT_LIST_WEIGHT':
            lc_text = TABLE_HEADING_WEIGHT;
            lc_align = 'right';
            break;
        case 'PRODUCT_LIST_IMAGE':
            lc_text = TABLE_HEADING_IMAGE;
            lc_align = 'center';
            break;
        case 'PRODUCT_LIST_BUY_NOW':
            lc_text = TABLE_HEADING_BUY_NOW;
            lc_align = 'center';
            break;
    }
    if (column_list[col] != 'PRODUCT_LIST_BUY_NOW' && column_list[col] != 'PRODUCT_LIST_IMAGE') {
        lc_text = tep_create_sort_heading(HTTP_GET_VARS['sort'], col + 1, lc_text);
    }
    prod_list_contents += '        <td' + (tep_not_null(lc_align) ? ' align="' + lc_align + '"' : '') + '>' + lc_text + '</td>';
}
prod_list_contents += '      </tr>' + '    </table>' + '  </div>';
if (listing_split.number_of_rows > 0) {
    rows = 0;
    listing_query = tep_db_query(listing_split.sql_query);
    prod_list_contents += '  <div class="ui-widget-content ui-corner-bottom productListTable">' + '    <table border="0" width="100%" cellspacing="0" cellpadding="2" class="productListingData">';
    tep_db_fetch_array(listing_query).forEach(function(listing){
        rows++;
        prod_list_contents += '      <tr>';
        for (col = 0, n = sizeof(column_list); col < n; col++) {
            switch (column_list[col]) {
                case 'PRODUCT_LIST_MODEL':
                    prod_list_contents += '        <td>' + listing['products_model'] + '</td>';
                    break;
                case 'PRODUCT_LIST_NAME':
                    if (HTTP_GET_VARS['manufacturers_id'] && tep_not_null(HTTP_GET_VARS['manufacturers_id'])) {
                        prod_list_contents += '        <td><a href="' + tep_href_link(FILENAME_PRODUCT_INFO, 'manufacturers_id=' + HTTP_GET_VARS['manufacturers_id'] + '&products_id=' + listing['products_id']) + '">' + listing['products_name'] + '</a></td>';
                    } else {
                        prod_list_contents += '        <td><a href="' + tep_href_link(FILENAME_PRODUCT_INFO, (cPath ? 'cPath=' + cPath + '&' : '') + 'products_id=' + listing['products_id']) + '">' + listing['products_name'] + '</a></td>';
                    }
                    break;
                case 'PRODUCT_LIST_MANUFACTURER':
                    prod_list_contents += '        <td><a href="' + tep_href_link(FILENAME_DEFAULT, 'manufacturers_id=' + listing['manufacturers_id']) + '">' + listing['manufacturers_name'] + '</a></td>';
                    break;
                case 'PRODUCT_LIST_PRICE':
                    if (tep_not_null(listing['specials_new_products_price'])) {
                        prod_list_contents += '        <td align="right"><del>' + currencies.display_price(listing['products_price'], tep_get_tax_rate(listing['products_tax_class_id'])) + '</del>&nbsp;&nbsp;<span class="productSpecialPrice">' + currencies.display_price(listing['specials_new_products_price'], tep_get_tax_rate(listing['products_tax_class_id'])) + '</span></td>';
                    } else {
                        prod_list_contents += '        <td align="right">' + currencies.display_price(listing['products_price'], tep_get_tax_rate(listing['products_tax_class_id'])) + '</td>';
                    }
                    break;
                case 'PRODUCT_LIST_QUANTITY':
                    prod_list_contents += '        <td align="right">' + listing['products_quantity'] + '</td>';
                    break;
                case 'PRODUCT_LIST_WEIGHT':
                    prod_list_contents += '        <td align="right">' + listing['products_weight'] + '</td>';
                    break;
                case 'PRODUCT_LIST_IMAGE':
                    if (HTTP_GET_VARS['manufacturers_id'] && tep_not_null(HTTP_GET_VARS['manufacturers_id'])) {
                        prod_list_contents += '        <td align="center"><a href="' + tep_href_link(FILENAME_PRODUCT_INFO, 'manufacturers_id=' + HTTP_GET_VARS['manufacturers_id'] + '&products_id=' + listing['products_id']) + '">' + tep_image(DIR_WS_IMAGES + listing['products_image'], listing['products_name'], SMALL_IMAGE_WIDTH, SMALL_IMAGE_HEIGHT) + '</a></td>';
                    } else {
                        prod_list_contents += '        <td align="center"><a href="' + tep_href_link(FILENAME_PRODUCT_INFO, (cPath ? 'cPath=' + cPath + '&' : '') + 'products_id=' + listing['products_id']) + '">' + tep_image(DIR_WS_IMAGES + listing['products_image'], listing['products_name'], SMALL_IMAGE_WIDTH, SMALL_IMAGE_HEIGHT) + '</a></td>';
                    }
                    break;
                case 'PRODUCT_LIST_BUY_NOW':
                    prod_list_contents += '        <td align="center">' + tep_draw_button(IMAGE_BUTTON_BUY_NOW, 'cart', tep_href_link(HTTP_SERVER_VARS['PHP_SELF'], tep_get_all_get_params(['action']) + 'action=buy_now&products_id=' + listing['products_id'])) + '</td>';
                    break;
            }
        }
        prod_list_contents += '      </tr>';
    })
    prod_list_contents += '    </table>' + '  </div>' + '</div>';
    print(prod_list_contents);
} else {
    print("")
    print("    <p>" + TEXT_NO_PRODUCTS + "</p>")
    print("")
    print("")

}
if (listing_split.number_of_rows > 0 && (PREV_NEXT_BAR_LOCATION == '2' || PREV_NEXT_BAR_LOCATION == '3')) {
    print("")
    print("    <br />")
    print("")
    print("    <div>")
    print("      <span style=\"float: right;\">")
    
    print(TEXT_RESULT_PAGE + ' ' + listing_split.display_links(MAX_DISPLAY_PAGE_LINKS, tep_get_all_get_params(['page', 'info', 'x', 'y'])))
    print("</span>")
    print("")
    print("      <span>")
    
    print(listing_split.display_count(TEXT_DISPLAY_NUMBER_OF_PRODUCTS));
    print("</span>")
    print("    </div>")
    print("")
    print("")

}
print("")
print("  </div>")
print("")
