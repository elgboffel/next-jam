
/**
 * @param {object} object
 */
const saveRecords = (objects, index) => {

    if (! index || !objects) throw `no algolia index or object found to add as index record`;

    return index.saveObjects(objects, (err, content) => {
        if (err) throw err;
    });
}

exports.saveRecords = saveRecords;