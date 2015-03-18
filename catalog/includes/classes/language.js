/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2003 osCommerce

  Released under the GNU General Public License

  browser language detection logic Copyright phpMyAdmin (select_lang.lib.php3 v1.24 04/19/2002)
                                   Copyright Stephane Garin <sgarin@sgarin.com> (detect_language.php v0.1 04/02/2002)
*/
function languageclass(lng) // CLASS
{
    
    // CONSTRUCTOR START
    
        this.languages = { 'ar' : 'ar([-_][[:alpha:]]{2})?|arabic', 
                           'bg' : 'bg|bulgarian', 
                           'br' : 'pt[-_]br|brazilian portuguese', 
                           'ca' : 'ca|catalan', 
                           'cs' : 'cs|czech', 
                           'da' : 'da|danish', 
                           'de' : 'de([-_][[:alpha:]]{2})?|german', 
                           'el' : 'el|greek', 
                           'en' : 'en([-_][[:alpha:]]{2})?|english', 
                           'es' : 'es([-_][[:alpha:]]{2})?|spanish', 
                           'et' : 'et|estonian', 
									'fi' : 'fi|finnish', 
									'fr' : 'fr([-_][[:alpha:]]{2})?|french', 
									'gl' : 'gl|galician', 
									'he' : 'he|hebrew', 
									'hu' : 'hu|hungarian', 
									'id' : 'id|indonesian', 
									'it' : 'it|italian', 
									'ko' : 'ko|korean', 
									'ja' : 'ja|japanese', 
									'ka' : 'ka|georgian', 
									'lt' : 'lt|lithuanian',
									'lv' : 'lv|latvian', 
									'nl' : 'nl([-_][[:alpha:]]{2})?|dutch', 
									'no' : 'no|norwegian', 
									'pl' : 'pl|polish', 
									'pt' : 'pt([-_][[:alpha:]]{2})?|portuguese',
                           'ro' : 'ro|romanian', 
									'ru' : 'ru|russian', 
									'sk' : 'sk|slovak', 
									'sr' : 'sr|serbian', 
									'sv' : 'sv|swedish', 
									'th' : 'th|thai', 
									'tr' : 'tr|turkish', 
									'uk' : 'uk|ukrainian', 
									'tw' : 'zh[-_]tw|chinese traditional', 
									'zh' : 'zh|chinese simplified'};
        this.catalog_languages = {};
        languages_query = tep_db_fetch_array(tep_db_query('select languages_id, name, code, image, directory from ' 
                                                         + TABLE_LANGUAGES 
                                                         + ' order by sort_order'));
        for (l in languages_query) {
        	   languages = languages_query[l]
            this.catalog_languages[languages['code']] = {'id' : languages['languages_id'],
            														   'name' : languages['name'], 
            														   'image' : languages['image'], 
            														   'directory' : languages['directory']};
        }
        this.browser_languages = '';
        this.language = '';
    
    // CONSTRUCTOR END 
    
    
    this.set_language = function(language)
    {
        if (tep_not_null(language) && this.catalog_languages[language]) {
            this.language = this.catalog_languages[language];
        } else {
            this.language = this.catalog_languages[DEFAULT_LANGUAGE];
        }
    }
 
    this.set_language(lng); // CONSTRUCTOR CONTINUE!
   
    this.get_browser_language=function ()
    {
        this.browser_languages = explode(',', HTTP_SERVER_VARS['accept-language'] || '');
        for (i = 0, n = this.browser_languages.length; i < n; i++) {
            for (key in this.languages){
            	 var val = this.languages[key]
                if (this.browser_languages[i].match('/^(' + val + ')(;q=[0-9]\\.[0-9])?$/i')
                    && this.catalog_languages[key]) {
                    this.language = this.catalog_languages[key];
                    // TODO break 2;
                }
            }
        }
    }
}
