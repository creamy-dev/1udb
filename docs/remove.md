# Removing database items
This deletes an item fully from the database.
```
db.remove(key);
```
`key` - Key of item to remove
## How it works
We get a local copy of `this.json` to `json`, and writeKeys to `json.keys`, and writeNames to `json.names`.  
We then run a for loop to match the item, and once we match it by using `writeKeys[i] === key`, we remove it from `json.keys` and `json.names`, using splicing.  
Then, we update `json.keys` to match `writeKeys` and `json.names` to match `writeNames`.  
Before we update the files, we write `json` to `this.json`.  
Finally, we call `this.updateDatabase()` to update the database.