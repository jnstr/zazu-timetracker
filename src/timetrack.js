const jsonFile = require('jsonfile');
const os = require('os');
const path = require('path');


// build the filepath
const filePath = path.join(os.homedir(), '.zazu-timetracker.json')

// we'll store the data in here
let data = {};

/**
 * Load the data from the JSON file
 */
const loadData = () => {
    try {
        data = jsonFile.readFileSync(filePath);
    } catch (e) {
        data = {
            default: []
        };
    }
};

/**
 * Start tracking time for a given project
 * 
 * @param project the project name
 */
const registerStart = (project) => {
    // stop currently running task
    registerStop();

    data.default.push({
        project,
        start: Date.now()
    });
};

/**
 * Stop tracking time for the currenlty active timetracker
 */
const registerStop = () => {
    const lastIndex = data.default.length - 1;

    if (data.default[lastIndex] && !('stop' in data.default[lastIndex])) {
        data.default[lastIndex].stop = Date.now();
    }
};

/**
 * Delete an entry from the list by a given start timetstamp
 */
const registerDelete = (startTs) => {
    // only keep the entries with a different start ts
    data.default = data.default.filter(entry => entry.start != startTs);
}

/**
 * Get the items from the history
 */
const getHistory = (from, to) => {
    let items = Array.prototype.slice.call(data.default);
    items.reverse();
    return items;
};

/**
 * Save the data to the json file
 */
const save = () => {
    // Clear data before saving
    while (data.default.length > 500) {
        data.default.shift();
    }

    return jsonFile.writeFileSync(filePath, data);
};


module.exports = {
    loadData,
    registerStart,
    registerStop,
    getHistory,
    registerDelete,
    save
}