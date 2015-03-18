/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/
function bm_specials() // CLASS
{
    this.code = 'bm_specials';
    this.group = 'boxes';
    this.title;
    this.description;
    this.sort_order;
    this.enabled = false;
    
    this.isEnabled = function()
    {
        return this.enabled;
    }
    this.check = function()
    {
        return typeof 'MODULE_BOXES_SPECIALS_STATUS' != 'undefined'
    }
    
    
        this.title = MODULE_BOXES_SPECIALS_TITLE;
    
        this.description = MODULE_BOXES_SPECIALS_DESCRIPTION;
        if (this.check()) {
            this.sort_order = MODULE_BOXES_SPECIALS_SORT_ORDER;
            this.enabled = MODULE_BOXES_SPECIALS_STATUS == 'True';
            this.group = MODULE_BOXES_SPECIALS_CONTENT_PLACEMENT == 'Left Column' &&  'boxes_column_left'  || 'boxes_column_right';
        }
    
    
    this.execute = function()
    {
        // global HTTP_GET_VARS, languages_id, currencies, oscTemplate;
        if (!HTTP_GET_VARS['products_id']) {
            if (random_product = tep_random_select('select p.products_id, pd.products_name, p.products_price, p.products_tax_class_id, p.products_image, s.specials_new_products_price from ' 
                                                    + TABLE_PRODUCTS + ' p, ' 
                                                    + TABLE_PRODUCTS_DESCRIPTION + ' pd, ' 
                                                    + TABLE_SPECIALS + ' s '
                                                    + 'where p.products_status = \'1\' and p.products_id = s.products_id and pd.products_id = s.products_id and pd.language_id = \'' 
                                                    + languages_id 
                                                    + '\' and s.status = \'1\' order by s.specials_date_added desc limit ' 
                                                    + MAX_RANDOM_SELECT_SPECIALS)) {
                data = '<div class="ui-widget infoBoxContainer">' 
                     + '  <div class="ui-widget-header infoBoxHeading"><a href="' 
                     + tep_href_link(FILENAME_SPECIALS) 
                     + '">' 
                     + MODULE_BOXES_SPECIALS_BOX_TITLE 
                     + '</a></div>' 
                     + '  <div class="ui-widget-content infoBoxContents" style="text-align: center;"><a href="' 
                     + tep_href_link(FILENAME_PRODUCT_INFO, 'products_id=' + random_product['products_id']) 
                     + '">' 
                     + tep_image(DIR_WS_IMAGES + random_product['products_image'], random_product['products_name'], SMALL_IMAGE_WIDTH, SMALL_IMAGE_HEIGHT) 
                     + '</a><br /><a href="' 
                     + tep_href_link(FILENAME_PRODUCT_INFO, 'products_id=' + random_product['products_id']) 
                     + '">' 
                     + random_product['products_name'] 
                     + '</a><br /><del>' 
                     + currencies.display_price(random_product['products_price'], tep_get_tax_rate(random_product['products_tax_class_id'])) 
                     + '</del><br /><span class="productSpecialPrice">' 
                     + currencies.display_price(random_product['specials_new_products_price'], tep_get_tax_rate(random_product['products_tax_class_id'])) 
                     + '</span></div>' 
                     + '</div>';
                oscTemplate.addBlock(data, this.group);
            }
        }
    }
    this.install = function()
    {
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) ' 
        			+ "values (\'Enable Specials Module\', \'MODULE_BOXES_SPECIALS_STATUS\', \'True\', \'Do you want to add the module to your shop?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'True\\\', \\\'False\\\'), \', now())")
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) ' 
        			+ "values (\'Content Placement\', \'MODULE_BOXES_SPECIALS_CONTENT_PLACEMENT\', \'Right Column\', \'Should the module be loaded in the left or right column?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'Left Column\\\', \\\'Right Column\\\'), \', now())")
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, date_added) ' 
        			+ "values (\'Sort Order\', \'MODULE_BOXES_SPECIALS_SORT_ORDER\', \'0\', \'Sort order of display. Lowest is displayed first.\', \'6\', \'0\', now())")
    }
    this.remove = function()
    {
        tep_db_query('delete from ' + TABLE_CONFIGURATION + ' where configuration_key in (\'' + implode('\', \'', this.keys()) + '\')');
    }
    this.keys = function()
    {
        return ['MODULE_BOXES_SPECIALS_STATUS', 'MODULE_BOXES_SPECIALS_CONTENT_PLACEMENT', 'MODULE_BOXES_SPECIALS_SORT_ORDER'];
    }
}
