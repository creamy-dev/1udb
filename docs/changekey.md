# Changing keys
This allows you to rename a key.
```
db.changeKey(oldKeyName, newKeyName)
```
`oldKeyName` - The name of the key to be renamed.
`newKeyName` - The new name of the key.
## How it works
We first save a local copy of the json from `this.json` into `json`, and `json.keys` into writeKeys, and finally, `json.names` into writeNames.  
We then get the index of the key, and sets `writeKeys`, with the index, to the new value.  
Then, we synchronize `writeKeys` to `json.keys`, and `writeNames` to `json.names`.  
Finally, we save the json to `this.json`, and call `this.updateDatabase()`.