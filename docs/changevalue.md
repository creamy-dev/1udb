# Changing values
This allows you to change the value of something in the database.
```
db.changeValue(key, value)
```
`key` - The key of the value to change.
`value` - The new value.
## How it works
We first save a local copy of the json from `this.json` into `json`, and `json.keys` into writeKeys, and finally, `json.names` into writeNames.  
We then get the index of the key, and sets `writeNames`, with the index, to the new value.  
Then, we synchronize `writeKeys` to `json.keys`, and `writeNames` to `json.names`.  
Finally, we save the json to `this.json`, and call `this.updateDatabase()`.