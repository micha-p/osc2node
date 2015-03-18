/*
  $Id$

  osCommerce, Open Source E-Commerce Solutions
  http://www.oscommerce.com

  Copyright (c) 2002 osCommerce

  Released under the GNU General Public License

  Example usage:

  $messageStack = new messageStack();
  $messageStack->add('general', 'Error: Error 1', 'error');
  $messageStack->add('general', 'Error: Error 2', 'warning');
  if ($messageStack->size('general') > 0) echo $messageStack->output('general');
*/

var messageToStack // global


function messageStackclass() // CLASS
{
    this.inheritFrom = tableBox	      // formalism to invoke superclass
	 this.inheritFrom([])					// for inheritance
	 this.messages = []

  /* TODO      if (tep_session_is_registered('messageToStack')) {
            for (i = 0, n = sizeof(messageToStack); i < n; i++) {
                this.add(messageToStack[i]['class'], messageToStack[i]['text'], messageToStack[i]['type']);
            }
            tep_session_unregister('messageToStack');
        }
  */  
    
    // class methods
    this.add = function(messageclass, message, type)
    {
        if (type == 'error' || typeof type == 'undefined') {
            this.messages[this.messages.length] = {'params' : 'class="messageStackError"', 'class' : messageclass, 'text' : tep_image(DIR_WS_ICONS + 'error.gif', ICON_ERROR) + '&nbsp;' + message};
        } else if (type == 'warning') {
            this.messages[this.messages.length] = {'params' : 'class="messageStackWarning"', 'class' : messageclass, 'text' : tep_image(DIR_WS_ICONS + 'warning.gif', ICON_WARNING) + '&nbsp;' + message};
        } else if (type == 'success') {
            this.messages[this.messages.length] = {'params' : 'class="messageStackSuccess"', 'class' : messageclass, 'text' : tep_image(DIR_WS_ICONS + 'success.gif', ICON_SUCCESS) + '&nbsp;' + message};
        } else {
            this.messages[this.messages.length] = {'params' : 'class="messageStackError"', 'class' : messageclass, 'text' : message};
        }
    }
    this.add_session = function(messageclass, message, type /* : 'error'*/)
    {
        if (!tep_session_is_registered('messageToStack')) {
            tep_session_register('messageToStack');
            messageToStack = []
        }
        messageToStack[messageToStack.length] = {'class' : messageclass, 'text' : message, 'type' : type};
    }
    this.reset = function()
    {
        this.messages = {};
    }
    this.output = function(messageclass)
    {
        this.table_data_parameters = 'class="messageBox"';
        output = []
        for (i = 0, n = sizeof(this.messages); i < n; i++) {
            if (this.messages[i]['class'] == messageclass) {
                output[output.length] = this.messages[i];
            }
        }
        return this.tableBox(output);
    }
    this.size = function(messageclass)
    {
        count = 0;
        for (i = 0, n = sizeof(this.messages); i < n; i++) {
            if (this.messages[i]['class'] == messageclass) {
                count++;
            }
        }
        return count;
    }
}
