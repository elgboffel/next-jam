const fs = require("fs");
const constants = require("./constants");

const createPost = (frontmatter, path, root) => {
    
    if (!frontmatter) throw `frontmatter is ${frontmatter}`;

    const FILE_NAME = "index.md";
    const MARKDOWN_TYPE = "yaml";
    const filePath = `${constants.contentRootPath}${path}`;

    // Check if we already have an existing folder and avoid creating a new folder
    if (fs.existsSync(filePath)) return root.createPost(`${filePath}${FILE_NAME}`, MARKDOWN_TYPE, frontmatter);

    // If we get here create a new folder and create a post
    root.directory(filePath, (dir) => dir.createPost(FILE_NAME, MARKDOWN_TYPE, frontmatter));
}

module.exports = createPost;