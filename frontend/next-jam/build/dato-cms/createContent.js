const constants = require("./constants");
const traverse = require("./traverse");
const createPage = require("./createPage");

const createContent = (dato, root, i18n) => {
    const collectionTypes = Object.entries(dato.collectionsByType).map(type => type[0]);

    collectionTypes.forEach(type => {
        const records = dato[type];

        if (type === "frontPage") return;

        traverse(
            records,
            constants.rootPath,
            root,
            (page, path, root) => createPage(page, path, root)
          );
    });
}

module.exports = createContent;