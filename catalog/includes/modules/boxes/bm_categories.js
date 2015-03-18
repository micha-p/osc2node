/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2010 osCommerce

  Released under the GNU General Public License
*/


function bm_categories() // CLASS
{
    this.code = 'bm_categories';
    this.group = 'boxes';
    this.title;
    this.tree = []
    this.categories_string = ''
    this.description;
    this.sort_order;
    this.enabled = false;
    
    this.title = MODULE_BOXES_CATEGORIES_TITLE;
    this.description = MODULE_BOXES_CATEGORIES_DESCRIPTION;
    if (typeof 'MODULE_BOXES_CATEGORIES_STATUS' != 'undefined') {
       this.sort_order = MODULE_BOXES_CATEGORIES_SORT_ORDER;
       this.enabled = MODULE_BOXES_CATEGORIES_STATUS == 'True';
       this.group = MODULE_BOXES_CATEGORIES_CONTENT_PLACEMENT == 'Left Column' &&  'boxes_column_left'  || 'boxes_column_right';
    }
    
    this.tep_show_category = function(counter){
    	
        // global cPath_array;
        var cPath_new
        for (i = 0; i < this.tree[counter]['level']; i++) {
            this.categories_string += '&nbsp;&nbsp;';
        }
        this.categories_string += '<a href="';
        if (this.tree[counter]['parent'] == 0) {
            cPath_new = 'cPath=' + counter;
        } else {
            cPath_new = 'cPath=' + this.tree[counter]['path'];
        }
        this.categories_string += tep_href_link(FILENAME_DEFAULT, cPath_new) + '">';
        
        if (cPath_array && in_array(counter, cPath_array)) {
            this.categories_string += '<strong>';
        }

        // display category name
        this.categories_string += this.tree[counter]['name'];
 
        if (cPath_array && in_array(counter, cPath_array)) {
            this.categories_string += '</strong>';
        }
        if (tep_has_category_subcategories(counter)) {
            this.categories_string += '-&gt;';
        }
        this.categories_string += '</a>';
        if (SHOW_COUNTS == 'true') {
            var products_in_category = tep_count_products_in_category(counter);
            if (products_in_category > 0) this.categories_string += '&nbsp;(' + products_in_category + ')'
        }
        this.categories_string += '<br />';
        if (this.tree[counter]['next_id'] != false) this.tep_show_category(this.tree[counter]['next_id'])        
    }
    
    this.getData = function()
    {
        // global languages_id, cPath, cPath_array;
        var parent_id = false
        var first_id = false
        var first_element = false
		  var newtree = this.tree
        this.categories_string = ''

        categories_query = tep_db_query('select c.categories_id, cd.categories_name, c.parent_id from ' + TABLE_CATEGORIES + ' c, ' + TABLE_CATEGORIES_DESCRIPTION + ' cd where c.parent_id = \'0\' and c.categories_id = cd.categories_id and cd.language_id=\'' + languages_id + '\' order by sort_order, cd.categories_name');
        tep_db_fetch_array(categories_query).forEach(function(categories){
            newtree[categories['categories_id']] = {'name' : categories['categories_name'], 'parent' : categories['parent_id'], 'level' : 0, 'path' : categories['categories_id'], 'next_id' : false};
            if (parent_id) newtree[parent_id]['next_id'] = categories['categories_id']
            parent_id = categories['categories_id'];
            if (!first_element) first_element = categories['categories_id']
        })
        if (tep_not_null(cPath)) {
            var new_path = ''
            for (var key in cPath_array) {
            	 var value = cPath_array[key]
                parent_id=false
                first_id=false
                categories_query = tep_db_query('select c.categories_id, cd.categories_name, c.parent_id from ' + TABLE_CATEGORIES + ' c, ' + TABLE_CATEGORIES_DESCRIPTION + ' cd where c.parent_id = \'' + value + '\' and c.categories_id = cd.categories_id and cd.language_id=\'' + languages_id + '\' order by sort_order, cd.categories_name');
                if (tep_db_num_rows(categories_query)) {
                    new_path += value;
                    tep_db_fetch_array(categories_query).forEach(function(row){
                        newtree[row['categories_id']] = {'name' : row['categories_name'], 'parent' : row['parent_id'], 'level' : key + 1, 'path' : new_path + '_' + row['categories_id'], 'next_id' : false};
                        if (parent_id) {newtree[parent_id]['next_id'] = row['categories_id']}
                        parent_id = row['categories_id']
                        if (!first_id) {first_id = row['categories_id']}
                        last_id = row['categories_id']
                    })
                    newtree[last_id]['next_id'] = newtree[value]['next_id']
                    newtree[value]['next_id'] = first_id
                    new_path += '_'
                } else {
                    break;
                }
            }
        }
        this.tep_show_category(first_element);
        data = '<div class="ui-widget infoBoxContainer">' 
             + '  <div class="ui-widget-header infoBoxHeading">' 
             + MODULE_BOXES_CATEGORIES_BOX_TITLE 
             + '</div>' 
             + '  <div class="ui-widget-content infoBoxContents">' 
             + this.categories_string 
             + '</div>' 
             + '</div>'
        this.tree=newtree
        return data;
    }
    this.execute = function(oscTemplate)
    {
        // global SID
        if (false /* TODO USE_CACHE == 'true' && empty(SID)*/) {
            output = tep_cache_categories_box();
        } else {
            output = this.getData();
        }
        oscTemplate.addBlock(output, this.group);
    }
    this.isEnabled = function()
    {
        return this.enabled;
    }
    this.check = function()
    {
        return (typeof 'MODULE_BOXES_CATEGORIES_STATUS' != 'undefined')
    }
    this.install = function()
    {
        tep_db_query('insert into ' 
         		+ TABLE_CONFIGURATION 
         		+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) values (\'Enable Categories Module\', \'MODULE_BOXES_CATEGORIES_STATUS\', \'True\', \'Do you want to add the module to your shop?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'True\\\', \\\'False\\\'), \', now())');
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, set_function, date_added) values (\'Content Placement\', \'MODULE_BOXES_CATEGORIES_CONTENT_PLACEMENT\', \'Left Column\', \'Should the module be loaded in the left or right column?\', \'6\', \'1\', \'tep_cfg_select_option(array(\\\'Left Column\\\', \\\'Right Column\\\'), \', now())');
        tep_db_query('insert into ' 
        			+ TABLE_CONFIGURATION 
        			+ ' (configuration_title, configuration_key, configuration_value, configuration_description, configuration_group_id, sort_order, date_added) values (\'Sort Order\', \'MODULE_BOXES_CATEGORIES_SORT_ORDER\', \'0\', \'Sort order of display. Lowest is displayed first.\', \'6\', \'0\', now())');
    }
    this.remove = function()
    {
        tep_db_query('delete from ' + TABLE_CONFIGURATION + ' where configuration_key in (\'' + implode('\', \'', this.keys()) + '\')');
    }
    this.keys = function()
    {
        return ['MODULE_BOXES_CATEGORIES_STATUS', 'MODULE_BOXES_CATEGORIES_CONTENT_PLACEMENT', 'MODULE_BOXES_CATEGORIES_SORT_ORDER']
    }
}
