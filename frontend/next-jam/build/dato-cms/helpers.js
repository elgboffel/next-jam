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

    if (!parentId) return url;

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
    // template: item.entity.itemType.apiKey.split("_").reduce((acc, name) => `${acc}${capitalizeFirstLetter(name)}`, ""), // TODO: delete if unused later on

    return {
        id,
        objectID: id,
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
 * @param {Object[]} items
 */
const getFrontmatter = (data, siteMap) => {

    if (!data) return;

    const mappedData = data.toMap(1);

    if (data.link) mappedData.link = data.link.toMap(1);

    if (data.links) mappedData.links = data.links.toMap(1);

    /* Map modular blocks */
    Object.keys(data).forEach(name => {
        const object = data[name];
        const firstArrayItem = object[0];

        if (firstArrayItem && firstArrayItem.entity && firstArrayItem.entity.itemType.modularBlock) {

             mappedData[name] = data.spots.toMap(2); 
        }
    });


    return {
        ...mappedData
    };
};

exports.getFrontmatter = getFrontmatter;
exports.storeData = storeData;
exports.getBaseObject = getBaseObject;
exports.buildUrl = buildUrl;
exports.capitalizeFirstLetter = capitalizeFirstLetter;

