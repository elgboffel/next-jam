const constants = require("./constants");
const traverse = require("./traverse");
const createPage = require("./createPage");

const createContent = (dato, root, i18n) => {
    console.time("build collections");

    const collectionsByTypes = dato.collectionsByType;

    let content = [];
    let siteMap = [];
    for (let key in collectionsByTypes) {
        if(!collectionsByTypes.hasOwnProperty(key)) continue;

        const items = collectionsByTypes[key]

        if (!Array.isArray(items)) continue;

        items.forEach(item => {
            const entity = item.entity;

            const url = buildUrl(item, items);

            const baseObject = {
                id: entity.payload.id,
                type: item.itemType.name,
                url
            };

            siteMap.push(baseObject);
        });
    }

    // collectionTypes.forEach(type => {
    //     const records = dato[type];

    //     if (type === "frontPage") return;

    //     traverse(
    //         records,
    //         constants.rootPath,
    //         root,
    //         (page, path, root) => createPage(page, path, root)
    //       );
    // });
    // console.log(siteMap)
    console.timeEnd("build collections")
}

const buildUrl = (item, itemList) => {
    const entity = item.entity;
    let url = `/${item.slug}/`
    let parentId = entity.parentId;    

    if (!parentId) return url;

    while (parentId) {
        const parent = itemList.filter(x => x.entity.payload.id === parentId)[0];

        if (parent) {
            url = `/${parent.slug}${url}`;
            parentId = parent.entity.parentId
        };
    }

    return url;
}

module.exports = createContent;