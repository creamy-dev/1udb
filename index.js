/**
 * class for database
 */
class Database {
    /**
     * initializes the database by setting some internal paramaters.
     * @param {boolean} wipe if true, wipe the database 
     */
    async serialize(wipe) {
        const fs = require('fs');
        const path = require('path');
        let data = {};
        
        try {
            if (!wipe) {
                data = await fs.readFileSync(this.name, 'utf8');
            } else {
                throw("uwu *wipes file cutely*") // Copilot can't handle the "uwu"
            }
        } catch (e) {
            data = await fs.writeFileSync(this.name, `{"keys": [], "names": []}`);
        }

        this.name = path.join(this.name);
    }

    /**
     * adds data into a database
     * @param {string} key name of item to be stored
     * @param {string} value item to be stored
     */
    async add(key, value) {
        const fs = require('fs');

        let data = await fs.readFileSync(this.name, 'utf8');
        let json = JSON.parse(data);

        let writeKeys = json.keys;
        let writeNames = json.names;

        writeKeys.push(key);
        writeNames.push(value);

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

        await fs.writeFileSync(this.name, `{"keys": [${writeKeys.join(", ")}], "names": [${writeNames.join(", ")}]}`);
    }

    /**
     * gets item from database
     * @param {string} key item to search for in database 
     * @returns parsed data from database
     */
    async get(key) {
        const fs = require('fs');
        const path = require('path');

        let data = await fs.readFileSync(this.name, 'utf8');
        data = JSON.parse(data);
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
        const fs = require('fs');

        let data = await fs.readFileSync(this.name, 'utf8');
        let json = JSON.parse(data);

        let writeKeys = json.keys;
        let writeNames = json.names;

        for (let i = 0; i < writeKeys.length; i++) {
            if (writeKeys[i] === key) {
                writeKeys.splice(i, 1);
                writeNames.splice(i, 1);
            }
        }

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

        await fs.writeFileSync(this.name, `{"keys": [${writeKeys.join(", ")}], "names": [${writeNames.join(", ")}]}`);
    }

    /**
     * querys for item in database
     * @param {string} value value of item to search for
     * @returns JSON object with name and value of item
     */

    async query(value) {
        const fs = require('fs');

        let data = await fs.readFileSync(this.name, 'utf8');
        let json = JSON.parse(data);

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
        const fs = require('fs');

        let data = await fs.readFileSync(this.name, 'utf8');
        let json = JSON.parse(data);

        let writeKeys = json.keys;
        let writeNames = json.names;

        let index = writeKeys.indexOf(key);
        writeNames[index] = value;

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

        await fs.writeFileSync(this.name, `{"keys": [${writeKeys.join(", ")}], "names": [${writeNames.join(", ")}]}`);
    }

    /**
     * pre-initialization of database; ran when typing 'const db = new Database()'
     * @param {string} name location of database
     */
    constructor(name) {
        this.name = name;
    }
}

module.exports = Database;