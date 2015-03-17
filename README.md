Fork on osCommerce v2.3.4 running on nodejs
===============================

The shop is a stripped down fork of oscommerce
Some slowing components are replaced by other means:

- Time logging is done by the request handler
- Logging of visitors has to be done with log files of proxy webserver
- Visitors do not get a session nor log entry
- social functions are removed completely
- newsletter is removed completely
- transferred bytes have to retrieved by proxy

THIS IS NOT INTENDED FOR PRODUCTION !!!

- no accounts
- no payments
- no shipping
