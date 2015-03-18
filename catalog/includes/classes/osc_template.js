/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2014 osCommerce

  Released under the GNU General Public License
*/

// GLOBAL
if (typeof language == "undefined") language = 'english';
if (typeof TITLE == "undefined") TITLE = 'UNKNOWN TITLE';
fs = require('fs')

// GLOBAL for some dynamically defined varaiables
var specialnamespace={}

function oscTemplateclass() // CLASS
{
    this._title=''
    this._blocks = {}; // assoc list of arrays
    this._content = {};
    this._grid_container_width = 24;
    this._grid_content_width = 16;
    this._grid_column_width = 4;
    this._data = {}
    this._title = TITLE;

    this.setGridContainerWidth = function(width){this._grid_container_width = width}
    this.getGridContainerWidth = function(){return this._grid_container_width}
    this.setGridContentWidth = function(width){this._grid_content_width = width}
    this.getGridContentWidth = function(){return this._grid_content_width}
    this.setGridColumnWidth = function(width){this._grid_column_width = width}
    this.getGridColumnWidth = function(){return this._grid_column_width;}
    this.setTitle = function(title){this._title = title}
    this.getTitle = function(){return this._title}
    this.addBlock = function(block, group){
    	if (! this.hasBlocks(group)) this._blocks[group]=[]
    	this._blocks[group][this._blocks[group].length] = block;
     }
    this.hasBlocks = function(group){return this._blocks[group] && !empty(this._blocks[group]);}
    this.getBlocks = function(group){
    	if (this.hasBlocks(group)) {
    		return implode('\n', this._blocks[group]);
    		}
    	}
    this.buildBlocks = function(){
         if (typeof TEMPLATE_BLOCK_GROUPS != 'undefined' && tep_not_null(TEMPLATE_BLOCK_GROUPS)) {
            tbgroups_array = explode(';', TEMPLATE_BLOCK_GROUPS);
            for (var k in tbgroups_array) {
            	 var group = tbgroups_array[k]
                module_key = 'MODULE_' + strtoupper(group) + '_INSTALLED';
                if (typeof module_key != 'undefined' && tep_not_null(global[module_key])) {
                    modules_array = explode(';', global[module_key]);
                    for (var l in modules_array) {
                    	   var module = modules_array[l]
                        classtype = substr(module, 0, strrpos(module, '.'));
                        if (typeof specialnamespace[classtype] == "undefined"){
                        	 if (TRACE) PRINT(DIR_WS_MODULES+group+'/'+module+'!!! MODULE?')
                            if (fs.existsSync(DIR_WS_LANGUAGES+language+'/modules/'+group+'/'+module)) {
                                /* TODO specialnamespace[DIR_WS_LANGUAGES+language+'/modules/'+group+'/'+module] 
                                    = eval(fs.readFileSync(DIR_WS_LANGUAGES+language +'/modules/'+group+'/'+module).toString()) */
                            }
                            if (fs.existsSync(DIR_WS_MODULES+group+'/'+classtype+'.js')) {
                                eval(fs.readFileSync(DIR_WS_MODULES+group+'/'+classtype+'.js').toString())
                                specialnamespace[classtype]=1
                            }
                            if (fs.existsSync(DIR_WS_LANGUAGES+language+'/modules/'+group+'/'+classtype+'.js')) {
                                eval(fs.readFileSync(DIR_WS_LANGUAGES+language+'/modules/'+group+'/'+classtype+'.js').toString())
                            }
                        }
                        if (typeof specialnamespace[classtype] != "undefined"){
                            eval('mb = new ' + classtype + '()')
                            if (mb.isEnabled()) mb.execute(this)
                        }
                    }
                }
            }
        }}
        
    this.addContent = function(content, group){this._content[group] = content;}
    this.hasContent = function(group){return this._content[group] && !empty(this._content[group]);}
    this.getContent = function(group){
         if (typeof specialnamespace['tp_'+group]=='undefined' && fs.exists(DIR_WS_MODULES +'pages/tp_'+group+'.js')) {
            specialnamespace[DIR_WS_MODULES+'pages/tp_'+group+'.js'] = eval(fs.readFileSync(DIR_WS_MODULES +'pages/tp_'+group+'.js').toString())
        }
        if (specialnamespace['tp_' + group] != 'undefined') {
            template_page_class = 'tp_' + group;
            template_page = new template_page_class();
            template_page.prepare();
        }
        for (var k in this.getContentModules(group)) {
        	   module = this.getContentModules(group)[k]
            if (typeof module != "undefined") {
                if (fs.exists(DIR_WS_MODULES+'content/'+group+'/'+module+'.js')) {
                    if (fs.exists(DIR_WS_LANGUAGES+language+'/modules/content/'+group+'/'+module+'.js')) {
                        specialnamespace[DIR_WS_LANGUAGES+language+'/modules/content/'+group+'/'+module+'.js'] 
                        = eval(fs.readFileSync(DIR_WS_LANGUAGES+language+'/modules/content/'+group+'/'+module+'.js').toString())
                    }
               	  if (DEBUG) PRINT(DIR_WS_MODULES+'content/'+group+'/'+module+'.js')
                    specialnamespace[DIR_WS_MODULES+'content/'+group+'/'+module+'.js'] 
                    = eval(fs.readFileSync(DIR_WS_MODULES+'content/'+group+'/'+module+'.js').toString())
                }
            }
            if (typeof module== "undefined") {
                mb = new module();
                if (mb.isEnabled()) {
                    mb.execute();
                }
            }
        }
        if (typeof specialnamespace['tp_' + group] != "undefined"){template_page.build()}
        if (this.hasContent(group)){return implode('\n', this._content[group]);} 
    }
    this.getContentModules = function(group){
        result = {};
        for(var k in explode(';', MODULE_CONTENT_INSTALLED)) {
            var m = explode(';', MODULE_CONTENT_INSTALLED)[k]
            module = explode('/', m, 2);
            if (module[0] == group) {
                result = module[1];
            }
        }
        return result;}
}