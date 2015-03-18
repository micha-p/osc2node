/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2013 osCommerce

  Released under the GNU General Public License
*/
function bm_search() // CLASS
{
    this.code = 'bm_search';
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
        return typeof 'MODULE_BOXES_SEARCH_STATUS' != 'undefined'
    }
    
        this.title = MODULE_BOXES_SEARCH_TITLE;
        this.description = MODULE_BOXES_SEARCH_DESCRIPTION;
        if (this.check()) {
            this.sort_order = MODULE_BOXES_SEARCH_SORT_ORDER;
            this.enabled = MODULE_BOXES_SEARCH_STATUS == 'True';
            this.group = MODULE_BOXES_SEARCH_CONTENT_PLACEMENT == 'Left Column' &&  'boxes_column_left'  || 'boxes_column_right';
        }
    
    
    this.execute = function(oscTemplate)
    {
        // global request_type; either SSL or NONSSL
        data = '<div class="ui-widget infoBoxContainer">' 
             + '  <div class="ui-widget-header infoBoxHeading">' 
             + MODULE_BOXES_SEARCH_BOX_TITLE 
             + '</div>' 
             + '  <div class="ui-widget-content infoBoxContents" style="text-align: center;">' 
             + '    ' 
             + tep_draw_form('quick_find', tep_href_link(FILENAME_ADVANCED_SEARCH_RESULT, '',HTTP_SERVER_VARS['REQUEST_TYPE'] , false), 'get') 
             + '    ' 
             + tep_draw_input_field('keywords', '', 'size="10" maxlength="30" style="width: 75%"') 
             + '&nbsp;' 
             + tep_draw_hidden_field('search_in_description', '1') 
       /*    + tep_hide_session_id() TODO*/ 
             + tep_image_submit('button_quick_find.gif', MODULE_BOXES_SEARCH_BOX_TITLE) 
             + '<br />' 
             + MODULE_BOXES_SEARCH_BOX_TEXT 
             + '<br />'
             + '<a href="' + tep_href_link(FILENAME_ADVANCED_SEARCH) + '">'
             + '<strong>' + MODULE_BOXES_SEARCH_BOX_ADVANCED_SEARCH + '</strong>'
             + '</a>' 
             + '    </form>' 
             + '  </div>' 
             + '</div>';
        oscTemplate.addBlock(data, this.group);
    }
    this.install = function()
    {
        tep_db_query('insert into ' 
            + TABLE_CONFIGURATION 
            + ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) values (\'Enable Search Module\', \'MODULE_BOXES_SEARCH_STATUS\', \'True\', \'Do you want to add the module to your shop?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'True\\\', \\\'False\\\'), \', now())');
        tep_db_query('insert into ' 
        		+ TABLE_CONFIGURATION 
        		+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) '
        		+ 'values (\'Content Placement\', \'MODULE_BOXES_SEARCH_CONTENT_PLACEMENT\', \'Left Column\', \'Should the module be loaded in the left or right column?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'Left Column\\\', \\\'Right Column\\\'), \', now())');
        tep_db_query('insert into ' 
        		+ TABLE_CONFIGURATION 
        		+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, date_added) values (\'Sort Order\', \'MODULE_BOXES_SEARCH_SORT_ORDER\', \'0\', \'Sort order of display. Lowest is displayed first.\', \'6\', \'0\', now())');
    }
    this.remove = function()
    {
        tep_db_query('delete from ' + TABLE_CONFIGURATION + ' where configuration_key in (\'' + implode('\', \'', this.keys()) + '\')');
    }
    this.keys = function()
    {
        return ['MODULE_BOXES_SEARCH_STATUS', 'MODULE_BOXES_SEARCH_CONTENT_PLACEMENT', 'MODULE_BOXES_SEARCH_SORT_ORDER'];
    }
}
