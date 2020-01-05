const { buildInfo } = require("./buildInfo");
const { buildUrl, getBaseObject, storeData, getFrontmatter } = require("./helpers");
const { siteConstants, algoliaConstants } = require('../constants');
const { algoliaClient } = require('../algolia/client');
const { getIndex } = require('../algolia/getIndex');
const { saveRecords } = require('../algolia/saveRecords');
const createPost = require('./createPost');

const createContent = (dato, root, i18n) => {
    const client = algoliaClient;
    const index = getIndex(algoliaConstants.MCCODE_CONTENT_INDEX, client);

    buildInfo(dato);

    console.time("build collections");

    const collectionsByTypes = dato.collectionsByType;

    let content = [];
    let siteMap = {};

    for (let key in collectionsByTypes) {
        if (!collectionsByTypes.hasOwnProperty(key)) continue;

        const items = collectionsByTypes[key]

        if (!Array.isArray(items)) {

            if (!items.slug) continue;

            const frontmatter = getFrontmatter(items);
            const baseObject = getBaseObject(frontmatter, items.slug);

            siteMap[`${baseObject.id}`] = { ...baseObject };
            content.push({...frontmatter, ...baseObject})

            continue;
        }

        items.forEach(item => {

            if (!item.slug) return;

            const url = buildUrl(item, items);
            const frontmatter = getFrontmatter(item);
            const baseObject = getBaseObject(frontmatter, url);

            siteMap[`${baseObject.id}`] = { ...baseObject };
            content.push({...frontmatter, ...baseObject})
        });
    }

    storeData(siteMap, siteConstants.siteMapPath);
    content.forEach(item => createPost(item, item.url, root));
    console.timeEnd("build collections");

    //Save content to Algolia index
    saveRecords(content, index);
}

module.exports = createContent;