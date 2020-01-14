
/**
 * @param {object} object
 */
const saveRecords = (objects, index, clearIndex = false) => {

    if (! index || !objects) throw `no algolia index or object found to add as index record`;

    /* reset index */
    if (clearIndex) index.clearIndex((err) => {
        if (err) throw err;
    });

    return index.saveObjects(objects, (err) => {
        if (err) throw err;
    });
}

exports.saveRecords = saveRecords;