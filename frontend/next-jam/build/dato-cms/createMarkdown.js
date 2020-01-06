const fs = require("fs");
const { siteConstants } = require("../constants");

const createContent = (item, path, root) => {
    const filePath = `${siteConstants.contentRootPath}${path}`;
    createMarkdown(item, filePath, root);
}

const createData = (item, path, root) => {
    const filePath = `${siteConstants.dataRootPath}${path}`;
    createMarkdown(item, filePath, root);
}

const createMarkdown = (item, filePath, root) => {
    console.log("filepath", filePath)

    if (!item) throw `item is ${item}`;
    
    const FILE_NAME = "index.md";
    const MARKDOWN_TYPE = "yaml";
    const frontmatter = { frontmatter: {...item } };

    // Check if we already have an existing folder and avoid creating a new folder
    if (fs.existsSync(filePath)) return root.createPost(`${filePath}${FILE_NAME}`, MARKDOWN_TYPE, frontmatter);

    // If we get here create a new folder and create a post
    root.directory(filePath, (dir) => dir.createPost(FILE_NAME, MARKDOWN_TYPE, frontmatter));
}

exports.createContent = createContent;
exports.createData = createData;
exports.createMarkdown = createMarkdown;