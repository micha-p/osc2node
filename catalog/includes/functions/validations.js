//     http://tools.ietf.org/html/rfc3696#page-5
//     http://www.w3resource.com/javascript/form/email-validation.php

function tep_validate_email(email)
{  
    var mail = email.trim()
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/  
    if (filter.test(mail))  
    {
        if (ENTRY_EMAIL_ADDRESS_CHECK) {
            var domain = explode('@', $email);
            if ( !checkdnsrr($domain[1], "MX") && !checkdnsrr($domain[1], "A") ) {
                 return false
            } else {
                 return mail
            }
        } else {
            return mail
        }
    } else {
        return false
    }  
} 