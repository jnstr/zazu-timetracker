const jsonFile = require('jsonfile');

module.exports = {
    register: (filePath, type, project) => {
        // try to read the file
        var data;
        try {
            data = jsonFile.readFileSync(filePath);
        } catch (e) {
            data = {
                default: []
            };
        }

        // add a new entry to the file
        data.default.push({
            project: project,
            type: type,
            time: Date.now()
        });

        // write the file to the filesystem
        return jsonFile.writeFileSync(filePath, data);
    }
}