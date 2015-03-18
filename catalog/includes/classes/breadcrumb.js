/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2003 osCommerce

  Released under the GNU General Public License
*/

function breadcrumbclass()
{
    this._trail=[]
    this.reset = function(){this._trail = []}
    this.add   = function(title, link){this._trail[this._trail.length] = {'title' : title, 'link' : link || ''}}
    this.trail = function(separator)
    {
        trail_string = '';
        for (i = 0, n = this._trail.length; i < n; i++) {
            if (this._trail[i]['link'] && tep_not_null(this._trail[i]['link'])) {
                trail_string += '<a href="' + this._trail[i]['link'] + '" class="headerNavigation">' + this._trail[i]['title'] + '</a>';
            } else {
                trail_string += this._trail[i]['title'];
            }
            if (i + 1 < n) {
                trail_string += separator || ' - ';
            }
        }
        return trail_string;
    }
}
