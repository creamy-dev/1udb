### BREAKING CHANGE IN 1.1.0, DO NOT UPDATE. MIGRATION CODE WILL COME SOON.
# 1udb
Imagine a database as lite as a 1U chassis.
## Installation Instructions
NPM install '@creamy-dev/1udb', in production mode.
```
npm install @creamy-dev/1udb --production
```
### Commiting installation instructions
Full install '@creamy-dev/1udb'.
```
npm install @creamy-dev/1udb
```
## Documentation
### Initiation
In your main file, require 1udb, and initialize a database.
```
const Database = require('@creamy-dev/1udb');
const db = new Database(__dirname + '/db.json');

async function main() {
    await db.serialize();
}

main();
```
For examples, I'd recommend looking at the jest test suite in index.test.js.
## Commiting information
If adding something important, add an test in index.test.js, and be sure to jsdoc the new function.  
