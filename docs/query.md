# Querying for items
This queries for items in the database, and returns the value.
```
db.query(value)
```
`value` - The value of the item to query for.
## How it works
We save a local copy of the JSON (`this.json`), into `json`. Then we run a for loop to go through all items in the database, and if matching, return a json object with this format:  
```
{
    "name": "item name",
    "value": "item value"
}
```
However, if we don't find anything, we return `null`.