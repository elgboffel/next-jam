/**
 * 
 * @param {Object} data 
 */
module.exports = (data) => {

    if (!data) return;

    const mappedData = data.toMap(1);

    return {
        ...mappedData
    };
};