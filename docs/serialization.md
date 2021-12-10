# Serializing Database 
This initializes the database by reading the database and saving it into memory for faster read performance.
```
db.seriaize(boolean);
```
`boolean` - If true, wipes the database.
## How it works
It first creates a variable called `data`. Then it reads the file, and if it doesn't exist or is set to wipe, it writes the template, `{"keys": [], "names": []}`.  
Then, it reads the files and sets it to `this.json`, and the path to `this.path`.
