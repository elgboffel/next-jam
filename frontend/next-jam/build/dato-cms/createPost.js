const fs = require("fs");
const { siteConstants } = require("../constants");

const createPost = (item, path, root) => {

    if (!item) throw `item is ${item}`;
    
    const FILE_NAME = "index.md";
    const MARKDOWN_TYPE = "yaml";
    const filePath = `${siteConstants.contentRootPath}${path}`;
    const frontmatter = { frontmatter: {...item } };

    // Check if we already have an existing folder and avoid creating a new folder
    if (fs.existsSync(filePath)) return root.createPost(`${filePath}${FILE_NAME}`, MARKDOWN_TYPE, frontmatter);

    // If we get here create a new folder and create a post
    root.directory(filePath, (dir) => dir.createPost(FILE_NAME, MARKDOWN_TYPE, frontmatter));
}

module.exports = createPost;