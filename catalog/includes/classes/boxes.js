/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2003 osCommerce

  Released under the GNU General Public License
*/


/*********************************************************/
/* THESE CLASSES ARE FUNCTIONS!                         	*/
/* content is organized as array of objects   			  	*/
/*	they are never called directly 								*/
/*      but by evaluating their names in modules/boxes   */						
/*********************************************************/


function tableBox(contents, direct_output /* : false*/) // CLASS
{
    this.table_border = '0';
    this.table_width = '100%';
    this.table_cellspacing = '0';
    this.table_cellpadding = '2';
    this.table_parameters = '';
    this.table_row_parameters = '';
    this.table_data_parameters = '';
    
    tableBox_string = '<table border="' 
                     + tep_output_string(this.table_border) 
                     + '" width="' 
                     + tep_output_string(this.table_width) 
                     + '" cellspacing="' 
                     + tep_output_string(this.table_cellspacing) 
                     + '" cellpadding="' 
                     + tep_output_string(this.table_cellpadding) 
                     + '"';

    if (tep_not_null(this.table_parameters)) {tableBox_string += ' ' + this.table_parameters }
    tableBox_string += '>' + '\n'
    
    for (i = 0, n = contents.length; i < n; i++) {

        if (contents[i]['form']&&tep_not_null(contents[i]['form'])){tableBox_string+=contents[i]['form']+'\n'}
        tableBox_string += '  <tr';
        if (tep_not_null(this.table_row_parameters)){tableBox_string+=' '+this.table_row_parameters}
        if (contents[i]['params']&&tep_not_null(contents[i]['params'])){tableBox_string+=' '+contents[i]['params']}
        tableBox_string += '>' + '\n';
        
        if (contents[i][0] && typeof contents[i][0] == 'object') {
            for (x = 0, n2 = contents[i].length; x < n2; x++){
		         if (contents[i][x]['text'] && tep_not_null(contents[i][x]['text'])){
		             tableBox_string += '    <td';
		             if(contents[i][x]['align']&&tep_not_null(contents[i][x]['align'])){tableBox_string += ' align="' + tep_output_string(contents[i][x]['align']) + '"'}
		             if (contents[i][x]['params'] && tep_not_null(contents[i][x]['params'])) {
		                  tableBox_string += ' ' + contents[i][x]['params']
		             } else {
		             	if (tep_not_null(this.table_data_parameters)){tableBox_string += ' ' + this.table_data_parameters}
		             }
		             tableBox_string += '>'
		             if (contents[i][x]['form'] && tep_not_null(contents[i][x]['form'])){tableBox_string += contents[i][x]['form']}
		             tableBox_string += contents[i][x]['text']
		             if (contents[i][x]['form'] && tep_not_null(contents[i][x]['form'])){tableBox_string += '</form>'}
		             tableBox_string += '</td>' + '\n'
		          }
		      }
        } else {
            tableBox_string += '    <td';
            if (contents[i]['align'] && tep_not_null(contents[i]['align'])) {tableBox_string += ' align="' + tep_output_string(contents[i]['align']) + '"'}
            if (contents[i]['params'] && tep_not_null(contents[i]['params'])){
            	tableBox_string += ' ' + contents[i]['params'];
            } else {
               if (tep_not_null(this.table_data_parameters)){tableBox_string += ' ' + this.table_data_parameters}
            }
            tableBox_string += '>' + contents[i]['text'] + '</td>' + '\n'
        }
        tableBox_string += '  </tr>' + '\n';
        if (contents[i]['form'] && tep_not_null(contents[i]['form'])) {tableBox_string += '</form>' + '\n'}
    }

    tableBox_string += '</table>' + '\n';
    if (direct_output == true) {print(tableBox_string)}
    return tableBox_string;
}

// the following boxes build up up their content as array of objects and return it after creation

function infoBox(contents)
{
 	 this.inheritFrom = tableBox	      // formalism to invoke superclass
	 this.inheritFrom()						// for inheritance

    info_box_contents = {'text' : this.infoBoxContents(contents)};
    this.table_cellpadding = '1';
    this.table_parameters = 'class="infoBox"';
    if (CLASS) PRINT(this.table_data_parameters + ' ' + substr(contents || '', 0, 128));
    this.tableBox(info_box_contents, true);
    this.infoBoxContents = function(contents)
    {
        this.table_cellpadding = '3';
        this.table_parameters = 'class="infoBoxContents"';
        info_box_contents=[]
        info_box_contents[info_box_contents.length] ={'text' : tep_draw_separator('pixel_trans.gif', '100%', '1')}
        for (i = 0, n = sizeof(contents); i < n; i++) {
            info_box_contents[info_box_contents.length] = {'align' : contents[i]['align'] &&  contents[i]['align']  || '',
                                                            'form' : contents[i]['form'] &&  contents[i]['form']  || '', 
                                                            'params' : 'class="boxText"', 
                                                            'text' : contents[i]['text'] &&  contents[i]['text']  || ''};
        }
        info_box_contents[info_box_contents.length] = {'text' : tep_draw_separator('pixel_trans.gif', '100%', '1')};
        return this.tableBox(info_box_contents);
    }
}

function infoBoxHeading(contents, left_corner /* : true*/, right_corner /* : true*/, right_arrow /* : false*/)
{
 	 this.inheritFrom = tableBox;
	 this.inheritFrom();
    this.table_cellpadding = '0';
    if (CLASS) PRINT('CLASS infoboxheading' + substr(contents, 0, 128));

    if (left_corner == true){left_corner = tep_image(DIR_WS_IMAGES + 'infobox/corner_left.gif')}
    else{left_corner = tep_image(DIR_WS_IMAGES + 'infobox/corner_right_left.gif')}
    
    if (right_arrow == true){right_arrow = '<a href="' + right_arrow + '">' + tep_image(DIR_WS_IMAGES + 'infobox/arrow_right.gif', ICON_ARROW_RIGHT) + '</a>'}
    else{right_arrow = ''}
    
    if (right_corner == true){right_corner = right_arrow + tep_image(DIR_WS_IMAGES + 'infobox/corner_right.gif')}
    else{right_corner = right_arrow + tep_draw_separator('pixel_trans.gif', '11', '14')}
    
    info_box_contents = [{'params' : 'height="14" class="infoBoxHeading"', 'text' : left_corner}, 
                         {'params' : 'width="100%" height="14" class="infoBoxHeading"', 'text' : contents[0]['text']}, 
                         {'params' : 'height="14" class="infoBoxHeading" nowrap', 'text' : right_corner}];
    this.tableBox(info_box_contents, true);
}

function contentBox(contents)
{
 	 this.inheritFrom = tableBox;
	 this.inheritFrom();

    info_box_contents = {'text' : this.contentBoxContents(contents)};
    this.table_cellpadding = '1';
    this.table_parameters = 'class="infoBox"';
    this.tableBox(info_box_contents, true);

    if (CLASS) PRINT(this.table_data_parameters + ' ' + substr(contents, 0, 128));
    
    this.contentBoxContents = function(contents)
    {
        this.table_cellpadding = '4';
        this.table_parameters = 'class="infoBoxContents"';
        return this.tableBox(contents);
    }
}

function contentBoxHeading(contents)
{
 	 this.inheritFrom = tableBox;
	 this.inheritFrom();
    this.table_width = '100%';
    this.table_cellpadding = '0';
    if (CLASS) PRINT('CLASS contentboxheading' + substr(contents, 0, 128));

    info_box_contents = [{'params' : 'height="14" class="infoBoxHeading"', 'text' : tep_image(DIR_WS_IMAGES + 'infobox/corner_left.gif')}, 
                         {'params' : 'height="14" class="infoBoxHeading" width="100%"', 'text' : contents[0]['text']}, 
                         {'params' : 'height="14" class="infoBoxHeading"', 'text' : tep_image(DIR_WS_IMAGES + 'infobox/corner_right_left.gif')}];
    this.tableBox(info_box_contents, true);
}

function errorBox(contents)
{
 	 this.inheritFrom = tableBox;
	 this.inheritFrom();
    this.table_data_parameters = 'class="errorBox"';
    if (CLASS) PRINT(this.table_data_parameters + ' ' + substr(contents, 0, 128));

    this.tableBox(contents, true);
}

function productListingBox(contents)
{
 	 this.inheritFrom = tableBox;
	 this.inheritFrom();
    this.table_parameters = 'class="productListing"';
    if (CLASS) PRINT(this.table_data_parameters + ' ' + substr(contents, 0, 128));

    this.tableBox(contents, true);
}
