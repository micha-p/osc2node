/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/
function bm_information() // CLASS
{
    this.code = 'bm_information';
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
        return typeof 'MODULE_BOXES_INFORMATION_STATUS' != 'undefined'
    }
    
        this.title = MODULE_BOXES_INFORMATION_TITLE;
        this.description = MODULE_BOXES_INFORMATION_DESCRIPTION;
        if (this.check()) {
            this.sort_order = MODULE_BOXES_INFORMATION_SORT_ORDER;
            this.enabled = MODULE_BOXES_INFORMATION_STATUS == 'True';
            this.group = MODULE_BOXES_INFORMATION_CONTENT_PLACEMENT == 'Left Column' &&  'boxes_column_left'  || 'boxes_column_right';
        }
    
    
    this.execute = function(oscTemplate)
    {
        data = '<div class="ui-widget infoBoxContainer">' + '  <div class="ui-widget-header infoBoxHeading">' + MODULE_BOXES_INFORMATION_BOX_TITLE + '</div>' + '  <div class="ui-widget-content infoBoxContents">' + '    <a href="' + tep_href_link(FILENAME_SHIPPING) + '">' + MODULE_BOXES_INFORMATION_BOX_SHIPPING + '</a><br />' + '    <a href="' + tep_href_link(FILENAME_PRIVACY) + '">' + MODULE_BOXES_INFORMATION_BOX_PRIVACY + '</a><br />' + '    <a href="' + tep_href_link(FILENAME_CONDITIONS) + '">' + MODULE_BOXES_INFORMATION_BOX_CONDITIONS + '</a><br />' + '    <a href="' + tep_href_link(FILENAME_CONTACT_US) + '">' + MODULE_BOXES_INFORMATION_BOX_CONTACT + '</a>' + '  </div>' + '</div>';
        oscTemplate.addBlock(data, this.group);
    }
    this.install = function()
    {
        tep_db_query('insert into ' + TABLE_CONFIGURATION + ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) values (\'Enable Information Module\', \'MODULE_BOXES_INFORMATION_STATUS\', \'True\', \'Do you want to add the module to your shop?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'True\\\', \\\'False\\\'), \', now())');
        tep_db_query('insert into ' + TABLE_CONFIGURATION + ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) values (\'Content Placement\', \'MODULE_BOXES_INFORMATION_CONTENT_PLACEMENT\', \'Left Column\', \'Should the module be loaded in the left or right column?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'Left Column\\\', \\\'Right Column\\\'), \', now())');
        tep_db_query('insert into ' + TABLE_CONFIGURATION + ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, date_added) values (\'Sort Order\', \'MODULE_BOXES_INFORMATION_SORT_ORDER\', \'0\', \'Sort order of display. Lowest is displayed first.\', \'6\', \'0\', now())');
    }
    this.remove = function()
    {
        tep_db_query('delete from ' + TABLE_CONFIGURATION + ' where configuration_key in (\'' + implode('\', \'', this.keys()) + '\')');
    }
    this.keys = function()
    {
        return ['MODULE_BOXES_INFORMATION_STATUS', 'MODULE_BOXES_INFORMATION_CONTENT_PLACEMENT', 'MODULE_BOXES_INFORMATION_SORT_ORDER'];
    }
}
