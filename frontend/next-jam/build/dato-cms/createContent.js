const { buildUrl, getBaseObject, storeData, getFrontmatter } = require("./helpers");
const constants = require('../constants');
const createPost = require('./createPost');

const createContent = (dato, root, i18n) => {
    buildInfo(dato);
    console.time("build collections");

    const collectionsByTypes = dato.collectionsByType;

    let content = [];
    let siteMap = {};

    for (let key in collectionsByTypes) {
        if (!collectionsByTypes.hasOwnProperty(key)) continue;

        const items = collectionsByTypes[key]

        if (!Array.isArray(items)) {
            const frontmatter = getFrontmatter(items);
            const baseObject = getBaseObject(frontmatter, items.slug);

            siteMap[`${baseObject.id}`] = { ...baseObject };
            content.push({ frontmatter: { ...frontmatter, ...baseObject } })

            continue;
        }

        items.forEach(item => {
            const url = buildUrl(item, items);
            const frontmatter = getFrontmatter(item);
            const baseObject = getBaseObject(frontmatter, url);

            siteMap[`${baseObject.id}`] = { ...baseObject };
            content.push({ frontmatter: { ...frontmatter, ...baseObject } })
        });
    }

    storeData(siteMap, constants.siteMapPath);
    content.forEach(item => createPost(item, item.frontmatter.url, root));
    console.timeEnd("build collections");
}

const buildInfo = (dato) => {
    if (process.env.INCOMING_HOOK_BODY) {
        const json = JSON.parse(process.env.INCOMING_HOOK_BODY)
        console.log("################### Incoming Hook Body ###################");
        console.log(process.env.INCOMING_HOOK_BODY);
        console.log("################### Incoming Hook Body End ###################");
        console.log("Item: ", dato.find(json.entity_id).toMap());
    }
}

module.exports = createContent;