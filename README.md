# 1udb
Imagine a database as lite as a 1U chassis.
## Installation Instructions
NPM install '@creamy-dev/1udb'.
```
npm install @creamy-dev/1udb
```
In your main file, require 1udb, and initialize a database.
```
const Database = require('@creamy-dev/1udb');
const db = new Database(__dirname + '/db.json');

async function main() {
    await db.serialize();
}

main();
```
