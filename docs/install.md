# Installation Guide 
## NPM Install
Install `@creamy-dev/1udb` via npm.
```
npm install --production @creamy-dev/1udb
```
## Initiating 1udb
Require `@creamy-dev/1udb`, and initiate a database with the file of your choice.
```
const Database = require('@creamy-dev/1udb');
const db = new Database(__dirname + "/data.json");
```
You can read more documentation for more help.
