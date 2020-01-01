// const createPost = require("./createPost");
const getFrontmatter = require("./getFrontmatter");
const fs = require('fs');
const constants = require('./constants');
const createPost = require('./createPost');

const createContent = (dato, root, i18n) => {
    console.time("build collections");

    const collectionsByTypes = dato.collectionsByType;

    let content = [];
    let siteMap = {};

    for (let key in collectionsByTypes) {
        if(!collectionsByTypes.hasOwnProperty(key)) continue;

        const items = collectionsByTypes[key]

        if (!Array.isArray(items)) {  
            const frontmatter = getFrontmatter(items);
            const baseObject = getBaseObject(frontmatter, "/"); // TODO: Better way of defining front page.

            siteMap[`${baseObject.id}`] = {...baseObject};
            content.push({ frontmatter: {...frontmatter, ...baseObject, slug: baseObject.url}})

            continue; 
        }

        items.forEach(item => {
            const url = buildUrl(item, items);
            const frontmatter = getFrontmatter(item);
            const baseObject = getBaseObject(frontmatter, url);

            siteMap[`${baseObject.id}`] = {...baseObject};
            content.push({ frontmatter: {...frontmatter, ...baseObject}})
        });
    }

    storeData(siteMap, constants.siteMapPath);
    content.forEach(item => createPost(item, item.frontmatter.url, root));
    console.timeEnd("build collections");
}

const getBaseObject = (item, url) => {
    const { id, name } = item;
    return {
        id,
        template: item.itemType.split("_").reduce((acc, name) => `${acc}${capitalizeFirstLetter(name)}`, ""),
        url,
        name
    };
};

const buildUrl = (item, itemList) => {
    const entity = item.entity;
    let url = `/${item.slug}/`
    let parentId = entity.parentId;    

    if (!parentId) return url;

    while (parentId) {
        const parent = itemList.filter(x => x.entity.payload.id === parentId)[0]; //TODO: This mighe be too slow. Maybe build the sitemap first and use it to find parent by id.

        if (parent) {
            url = `/${parent.slug}${url}`;
            parentId = parent.entity.parentId
        };
    }

    return url;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const storeData = (data, path) => {
  try {
    const code = `module.exports = ${JSON.stringify(data)};`;
    fs.writeFileSync(path, code, "utf8");
  } catch (err) {
    console.error(err)
  }
}

module.exports = createContent;