const fs = require('fs');

/**
 * 
 * @param {object} item 
 * @param {object[]} itemList 
 */
const buildUrl = (item, itemList) => {
    const entity = item.entity;
    let url = `/${item.slug}/`;
    let parentId = entity.parentId;
    if (!parentId)
        return url;
    while (parentId) {
        const parent = itemList.filter(x => x.entity.payload.id === parentId)[0]; //TODO: This mighe be too slow. Maybe build the sitemap first and use it to find parent by id.
        if (parent) {
            url = `/${parent.slug}${url}`;
            parentId = parent.entity.parentId;
        }
        ;
    }
    return url;
};

/**
 * 
 * @param {object} item 
 * @param {string} url 
 */
const getBaseObject = (item, url) => {
    const { id, name } = item;
    return {
        id,
        template: item.itemType.split("_").reduce((acc, name) => `${acc}${capitalizeFirstLetter(name)}`, ""),
        url,
        name
    };
};

/**
 * 
 * @param {string} string 
 */
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * 
 * @param {object} data 
 * @param {string} path 
 */
const storeData = (data, path) => {
    try {
        const code = `module.exports = ${JSON.stringify(data)};`;
        fs.writeFileSync(path, code, "utf8");
    }
    catch (err) {
        console.error(err);
    }
};

/**
 * 
 * @param {Object} data 
 */
const getFrontmatter = (data) => {

    if (!data) return;

    const mappedData = data.toMap(1);

    return {
        ...mappedData
    };
};

exports.getFrontmatter = getFrontmatter;
exports.storeData = storeData;
exports.getBaseObject = getBaseObject;
exports.buildUrl = buildUrl;
exports.capitalizeFirstLetter = capitalizeFirstLetter;

