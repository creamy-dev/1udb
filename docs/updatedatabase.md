# Force updating the database
This synchronises the files with the database. This is called after almost every function.
```
db.updateDatabase(bypassForce)
```
`bypassForce` - Bypass writing to the database.
## How it works
If `this.force` is true, or `shouldBypassForece` is true, then we run the code. Else, we stop execution of this function. This allows for the database to be written at command or be used in read only environments.  
First, we save a local copy of the `this.json` into `json`. Then, we set `writeKeys` to `json.keys`, which is the names for all of the keys. After that, we set `writeNames` to `json.names`.  
We run a for loop for everything in the array to rebuild the JSON & arrays because of a terrible bug. If the type of the keys or the names is a string, we put quotes around it, due to syntax errors when rebuilding.  
If the data is an object, we stringify it, and put it back into `writeNames`.  
Once that is done, we set `this.json` into the patched JSON, and write the file.  
After that is done, we parse `this.json`, and sets `this.json` to the parsed JSON.