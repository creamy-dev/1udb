# Getting data from the database
This gets data by using the key.
```
db.get(key);
```
`key` - The key for the item in the database.
## How it works
We get a local copy of the JSON data (`this.json`), and then get the keys by using `json.keys`, as keys.  
Then, we get the index of key, as `key`.
If the item is not in the databse by using `index === -1`, we return `null`.  
If the type is an object, we return the parsed data. Else, we just return the data.
