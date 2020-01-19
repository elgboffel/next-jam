const { buildInfo } = require("./buildInfo");
const { buildUrl, getBaseObject, storeData, getFrontmatter } = require("./helpers");
const { siteConstants, algoliaConstants } = require('../constants');
const { algoliaClient } = require('../algolia/client');
const { getIndex } = require('../algolia/getIndex');
const { saveRecords } = require('../algolia/saveRecords');
const { createContent, createData} = require('./createMarkdown');

const datoCMS = (dato, root, i18n) => {
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
            
            const frontmatter = getFrontmatter(item);
            const url = buildUrl(item, items);
            const baseObject = getBaseObject(frontmatter, url);
            
            siteMap[`${baseObject.id}`] = { ...baseObject };
            content.push({...frontmatter, ...baseObject})
        });
    }

    storeData(siteMap, siteConstants.siteMapPath);
    content.forEach(item => item && createContent(item, item.url, root));
    console.timeEnd("build collections");

    //Save content to Algolia index
    saveRecords(content.map(x => { 
        return {
            id: x.id,
            objectID: x.id,
            heading: x.heading,
            image: x.image && x.image.url,
            lead: x.lead,
            content: x.content
        }
    }), index, true);
}

module.exports = datoCMS;


// const { buildInfo } = require("./buildInfo");
// const { buildUrl, getBaseObject, storeData, getFrontmatter } = require("./helpers");
// const { siteConstants, algoliaConstants } = require('../constants');
// const { algoliaClient } = require('../algolia/client');
// const { getIndex } = require('../algolia/getIndex');
// const { saveRecords } = require('../algolia/saveRecords');
// const { createContent, createData} = require('./createMarkdown');

// const datoCMS = (dato, root, i18n) => {
//     const client = algoliaClient;
//     const index = getIndex(algoliaConstants.MCCODE_CONTENT_INDEX, client);

//     buildInfo(dato);

//     console.time("build collections");

//     const collectionsByTypes = dato.collectionsByType;

//     let content = [];
//     let siteMap = {};
//     let data = [];

//     for (let key in collectionsByTypes) {
//         if (!collectionsByTypes.hasOwnProperty(key)) continue;

//         const items = collectionsByTypes[key]

//         if (!Array.isArray(items)) {
            
//             if (!items.slug) continue;

//             const baseObject = getBaseObject(items, items.slug);

//             siteMap[`${baseObject.id}`] = { ...baseObject };
//             continue;
//         }

//         items.forEach(item => {

//             if (!item) return;
            
//             if (!item.slug) return;

//             const url = buildUrl(item, items);
//             const baseObject = getBaseObject(item, url);
            
//             siteMap[`${baseObject.id}`] = { ...baseObject };
//         });
//     }

//     for (let key in collectionsByTypes) {
//         if (!collectionsByTypes.hasOwnProperty(key)) continue;

//         const items = collectionsByTypes[key]

//         if (!Array.isArray(items)) {
            
//             if (!items.slug) continue;
            
//             const frontmatter = getFrontmatter(items);

//             content.push({...frontmatter, ...siteMap[`${frontmatter}`]})

//             continue;
//         }

//         items.forEach(item => {

//             if (!item) return;
            
//             if (!item.slug) return;
            
//             const frontmatter = getFrontmatter(item);

//             content.push({...frontmatter, ...siteMap[`${frontmatter.id}`]})
//         });
//     }

//     storeData(siteMap, siteConstants.siteMapPath);
//     content.forEach(item => item && createContent(item, item.url, root));
//     // data.forEach(item => item && createData(item, `/${item.itemType}/${item.id}`, root));
//     console.timeEnd("build collections");

//     //Save content to Algolia index
//     // saveRecords(content, index, true);
// }

// module.exports = datoCMS;