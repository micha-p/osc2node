/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/
function bm_manufacturer_info() // CLASS
{
    this.code = 'bm_manufacturer_info';
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
        return typeof 'MODULE_BOXES_MANUFACTURER_INFO_STATUS' != 'undefined'
    }
   
        this.title = MODULE_BOXES_MANUFACTURER_INFO_TITLE;
        this.description = MODULE_BOXES_MANUFACTURER_INFO_DESCRIPTION;
        if (this.check()) {
            this.sort_order = MODULE_BOXES_MANUFACTURER_INFO_SORT_ORDER;
            this.enabled = MODULE_BOXES_MANUFACTURER_INFO_STATUS == 'True';
            this.group = MODULE_BOXES_MANUFACTURER_INFO_CONTENT_PLACEMENT == 'Left Column' &&  'boxes_column_left'  || 'boxes_column_right';
        }
    
    
    this.execute = function(oscTemplate)
    {
        if (HTTP_GET_VARS['products_id']) {
            manufacturer_query = tep_db_query('select m.manufacturers_id, m.manufacturers_name, m.manufacturers_image, mi.manufacturers_url from ' 
                                              + TABLE_MANUFACTURERS 
                                              + ' m left join ' 
                                              + TABLE_MANUFACTURERS_INFO 
                                              + ' mi on (m.manufacturers_id = mi.manufacturers_id and mi.languages_id = \'' 
                                              + languages_id + '\'), ' 
                                              + TABLE_PRODUCTS 
                                              + ' p  where p.products_id = \'' 
                                              + HTTP_GET_VARS['products_id'] 
                                              + '\' and p.manufacturers_id = m.manufacturers_id');
            if (tep_db_num_rows(manufacturer_query)>0) {
                manufacturer = tep_db_fetch_array(manufacturer_query)[0];
                manufacturer_info_string = '<table border="0" width="100%" cellspacing="0" cellpadding="0" class="ui-widget-content infoBoxContents">';
                if (tep_not_null(manufacturer['manufacturers_image'])) {
                    manufacturer_info_string += '<tr><td align="center" colspan="2">' + tep_image(DIR_WS_IMAGES + manufacturer['manufacturers_image'], manufacturer['manufacturers_name']) + '</td></tr>';
                }
                if (tep_not_null(manufacturer['manufacturers_url'])) {
                    manufacturer_info_string += '<tr><td valign="top">-&nbsp;</td><td valign="top"><a href="' + tep_href_link(FILENAME_REDIRECT, 'action=manufacturer&manufacturers_id=' + manufacturer['manufacturers_id']) + '" target="_blank">' + sprintf(MODULE_BOXES_MANUFACTURER_INFO_BOX_HOMEPAGE, manufacturer['manufacturers_name']) + '</a></td></tr>';
                }
                manufacturer_info_string += '<tr><td valign="top">-&nbsp;</td><td valign="top"><a href="' + tep_href_link(FILENAME_DEFAULT, 'manufacturers_id=' + manufacturer['manufacturers_id']) + '">' + MODULE_BOXES_MANUFACTURER_INFO_BOX_OTHER_PRODUCTS + '</a></td></tr>' + '</table>';
                data = '<div class="ui-widget infoBoxContainer">' + '  <div class="ui-widget-header infoBoxHeading">' + MODULE_BOXES_MANUFACTURER_INFO_BOX_TITLE + '</div>' + '  ' + manufacturer_info_string + '</div>';
                oscTemplate.addBlock(data, this.group);
            }
        }
    }
    this.install = function()
    {
        tep_db_query('insert into ' 
       			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) '
        			+ "values (\'Enable Manufacturer Info Module\', \'MODULE_BOXES_MANUFACTURER_INFO_STATUS\', \'True\', \'Do you want to add the module to your shop?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'True\\\', \\\'False\\\'), \', now())")
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) ' 
        			+ "values (\'Content Placement\', \'MODULE_BOXES_MANUFACTURER_INFO_CONTENT_PLACEMENT\', \'Right Column\', \'Should the module be loaded in the left or right column?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'Left Column\\\', \\\'Right Column\\\'), \', now())")
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, date_added) ' 
        			+ "values (\'Sort Order\', \'MODULE_BOXES_MANUFACTURER_INFO_SORT_ORDER\', \'0\', \'Sort order of display. Lowest is displayed first.\', \'6\', \'0\', now())")
    }
    this.remove = function()
    {
        tep_db_query('delete from ' + TABLE_CONFIGURATION + ' where configuration_key in (\'' + implode('\', \'', this.keys()) + '\')');
    }
    this.keys = function()
    {
        return ['MODULE_BOXES_MANUFACTURER_INFO_STATUS', 'MODULE_BOXES_MANUFACTURER_INFO_CONTENT_PLACEMENT', 'MODULE_BOXES_MANUFACTURER_INFO_SORT_ORDER']
    }
}
