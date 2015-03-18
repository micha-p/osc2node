/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2014 osCommerce

  Released under the GNU General Public License
*/
oscTemplate.buildBlocks();
if (!oscTemplate.hasBlocks('boxes_column_left')) {
    oscTemplate.setGridContentWidth(oscTemplate.getGridContentWidth() + oscTemplate.getGridColumnWidth());
}
if (!oscTemplate.hasBlocks('boxes_column_right')) {
    oscTemplate.setGridContentWidth(oscTemplate.getGridContentWidth() + oscTemplate.getGridColumnWidth());
}

if (TRACE) PRINT('TEMPLATE TOP SHIP')


print('<!DOCTYPE html>')
print('<html '+ HTML_PARAMS + '>')
print('<head>')
print('<meta http-equiv="Content-Type" content="text/html; charset=' + CHARSET + '" />')
print('<title>'+ tep_output_string_protected(oscTemplate.getTitle()) + '</title>')
print('<base href="'+ (HTTP_SERVER_VARS['REQUEST_TYPE'] == 'SSL' &&  HTTPS_SERVER  || HTTP_SERVER) + DIR_WS_CATALOG + '" />')
print('<link rel="stylesheet" type="text/css" href="ext/jquery/ui/redmond/jquery-ui-1.10.4.min.css" />')
print('<script type="text/javascript" src="ext/jquery/jquery-1.11.1.min.js"></script>')
print('<script type="text/javascript" src="ext/jquery/ui/jquery-ui-1.10.4.min.js"></script>')

if (tep_not_null(JQUERY_DATEPICKER_I18N_CODE)) {
    print('<script type="text/javascript" src="ext/jquery/ui/i18n/jquery.ui.datepicker-' 
         + JQUERY_DATEPICKER_I18N_CODE
         + '.js"></script>')
    print('<script type="text/javascript">')
    print('$.datepicker.setDefaults($.datepicker.regional[\'' 
         + JQUERY_DATEPICKER_I18N_CODE
         + '\']);'
         + '</script>')
}
print('<script type="text/javascript" src="ext/photoset-grid/jquery.photoset-grid.min.js"></script>')
print('<link rel="stylesheet" type="text/css" href="ext/colorbox/colorbox.css" />')
print('<script type="text/javascript" src="ext/colorbox/jquery.colorbox-min.js"></script>')
print('<link rel="stylesheet" type="text/css" href="ext/960gs/'
     + ((stripos(HTML_PARAMS, 'dir="rtl"') &&  'rtl_')  || '')
     + '960_24_col.css" />')
print('<link rel="stylesheet" type="text/css" href="stylesheet.css" />')
print('')
print(oscTemplate.getBlocks('header_tags'));
print('</head>')
print('<body>')
print('')
print('<div id="bodyWrapper" class="container_' + oscTemplate.getGridContainerWidth() + '">')
print('')
print('')

eval(fs.readFileSync(DIR_WS_INCLUDES + 'header.js').toString())

print('')
print('<div id="bodyContent" class="grid_' 
     + oscTemplate.getGridContentWidth()
     + ((oscTemplate.hasBlocks('boxes_column_left') &&  (' push_' + oscTemplate.getGridColumnWidth() )) || '')
     + '">')
print('')
