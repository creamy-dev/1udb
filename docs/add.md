# Adding items
This function adds values into the database, as a key and value system.
```
db.add(key, value);
```
`key` - The pointers for the item and the database.
`value` - The value for the item in the database.
## How it works
It saves a local copy of the json into `json` (not to be confused with `this.json`.  
Then, we save `json.keys` into `writeKeys`. These define the definitions for the data.  
We do that process again for `json.names` into `writeNames`.
Then, we push the contents, and update `this.json` to `json`.  
Finally, we call `this.updateDatabase()`, which updates the database files.
