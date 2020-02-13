/**
 * 
 * @param {Object} objects
 * @param {Object} index
 * @param {boolean} clearIndex
 */
exports.saveRecords = (objects, index, clearIndex = false) => {

    if (! index || !objects) throw `no algolia index or object found to add as index record`;

    /* reset index */
    if (clearIndex) index.clearIndex((err) => {
        if (err) throw err;
    });

    return index.saveObjects(objects, (err) => {
        if (err) throw err;
        console.log(`Records Saved to algolia: ${objects}`);
    });
}
