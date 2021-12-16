const fs = require('fs');
const path = require('path');

/**
 * class for database
 */

class Database {
    /**
     * initializes the database by setting some internal paramaters.
     * @param {boolean} optional; wipes the database if true
     */
    async serialize(wipe) {
        let data = {};
        
        try {
            if (!wipe) {
                data = await fs.readFileSync(this.name, 'utf8');
            } else {
                throw("Wipe file")
            }
        } catch (e) {
            await fs.writeFileSync(this.name, `{"keys": [], "names": []}`);
            data = `{"keys": [], "names": []}`;
        }

        this.name = path.join(this.name);
        this.json = JSON.parse(data);
    }

    /**
     * adds data into a database
     * @param {string} key name of item to be stored
     * @param {string} value item to be stored
     */
    async add(key, value) {
        let json = this.json;

        let writeKeys = json.keys;
        let writeNames = json.names;
        
        if (writeKeys.indexOf(key) !== -1) {
            throw("Error: Item must not already be in database!");
        }

        writeKeys.push(key);
        writeNames.push(value);

        json.keys = writeKeys;
        json.names = writeNames;

        this.json = json.replaceAll("\n", "\\n");

        await this.updateDatabase();
    }

    /**
     * gets item from database
     * @param {string} key item to search for in database 
     * @returns parsed data from database
     */
    async get(key) {
        let data = this.json;

        let keys = data.keys;
        let index = keys.indexOf(key);

        if (index === -1) {
            return null;
        }

        if (typeof JSON.parse(JSON.stringify(data.names[index])) === 'object') {
            return JSON.parse(JSON.stringify(data.names[index]));
        }

        return data.names[index];
    }

    /**
     * deletes item from database
     * @param {string} key item to remove from database 
     */
    async remove(key) {
        let json = this.json;

        let writeKeys = json.keys;
        let writeNames = json.names;

        for (let i = 0; i < writeKeys.length; i++) {
            if (writeKeys[i] === key) {
                writeKeys.splice(i, 1);
                writeNames.splice(i, 1);
            }
        }

        json.keys = writeKeys;
        json.names = writeNames;

        this.json = json.replaceAll("\n", "\\n");

        await this.updateDatabase();
    }

    /**
     * querys for item in database
     * @param {string} value value of item to search for
     * @returns JSON object with name and value of item, or null if it doesn't exist.
     */
    async query(value) {
        let json = this.json;

        for (let i = 0; i < json.keys.length; i++) {
            let names = json.names[i];
            names = names.toLowerCase();

            if (names.startsWith(value.toLowerCase())) {
                return { name: json.keys[i], value: json.names[i] };
            }
        }

        return null;
    }

    /**
     * changes data in database
     * @param {string} key name of key to be searched for
     * @param {string} value value to change data to
     */
    async changeValue(key, value) {
        let json = this.json;

        let writeKeys = json.keys;
        let writeNames = json.names;

        let index = writeKeys.indexOf(key);
        writeNames[index] = value;

        json.keys = writeKeys;
        json.names = writeNames;

        this.json = json.replaceAll("\n", "\\n");

        await this.updateDatabase();
    }

    /**
     * renames key in database
     * @param {string} key original name of key 
     * @param {string} newKey new name of key
     */
    async changeKey(key, newKey) {
        let json = this.json;

        let writeKeys = json.keys;
        let writeNames = json.names;
    
        let index = writeKeys.indexOf(key);

        writeKeys[index] = newKey;

        json.keys = writeKeys;
        json.names = writeNames;

        this.json = json.replaceAll("\n", "\\n");

        await this.updateDatabase();
    }

    /**
     * updates database files
     */
    async updateDatabase(shouldBypassForce) {
        if (this.force || shouldBypassForce) {
            let json = this.json;

            let writeKeys = json.keys;
            let writeNames = json.names;

            for (let i = 0; i < writeKeys.length; i++) {
                if (typeof writeKeys[i] === 'string') {
                    writeKeys[i] = `"${writeKeys[i]}"`;
                }

                if (typeof writeNames[i] === 'string') {
                    writeNames[i] = `"${writeNames[i]}"`;
                }

                if (typeof writeNames[i] === 'object') {
                    writeNames[i] = JSON.stringify(writeNames[i]);
                }
            }

            this.json = `{"keys": [${writeKeys.join(", ")}], "names": [${writeNames.join(", ")}]}`;
            await fs.writeFileSync(this.name, this.json);
            this.json = JSON.parse(this.json);
        }
    }

    /**
     * pre-initialization of database; ran when typing 'const db = new Database()'
     * @param {string} name location of database
     * @param {boolean} shouldForceUpdate optional; if false, run in "ramdisk"
     */
    constructor(name, shouldForceUpdate) {
        this.name = name;
        this.json = {};

        if (shouldForceUpdate) {
            this.force = false;
        } else {
            this.force = true;
        }
    }
}

module.exports = Database;
