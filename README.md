Fork on osCommerce v2.3.4 running on nodejs
===============================

The shop is a stripped down fork of oscommerce
Some slowing components are replaced by other means:

- Time logging is done by the request handler
- Logging of visitors has to be done with log files of proxy webserver
- Visitors do not get a session nor log entry
- social functions are removed completely
- newsletter is removed completely
- download is removed
- transferred bytes have to retrieved by proxy

THIS IS NOT INTENDED FOR PRODUCTION !!!

- no accounts
- no payments
- no shipping

### INSTALL NODE MODULES

    sudo apt-get install nodejs npm
    sudo ln -s /usr/bin/nodejs /usr/local/bin/node # for old npm packages
	
### PREPARE DATABASE

    sudo mysqladmin --defaults-file=/etc/mysql/debian.cnf create osc
    sudo mysql --defaults-file=/etc/mysql/debian.cnf -e "grant all privileges on osc.* to 'oscuser'@'localhost' identified by 'MYPASSWORD' with GRANT OPTION;"
    sudo mysql --defaults-file=/etc/mysql/debian.cnf osc < install/oscommerce.sql 

check database and password in configure.js

### RUN EXPERIMENT

cd catalog
npm install image-size mime  mysql-libmysqlclient phpjs

# TODO

- collect some source files into modules or classes invoked once at server start
- change database access to asynchronous style
- check global variables