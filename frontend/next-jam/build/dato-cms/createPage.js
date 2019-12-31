const fs = require("fs");

const getFrontmatter = require("./getFrontmatter");

const createPage = (page, path, root) => {
    
    if (!page) throw `page is ${page}`;

    const fileName = "index.md";
    const frontmatter = getFrontmatter(page, path);

    // Check if we already have an existing folder and avoid creating a new folder
    if (fs.existsSync(path)) return root.createPost(`${path}/${fileName}`, "yaml", frontmatter);

    // If we get here create a new folder and create a post
    root.directory(path, (dir) => dir.createPost(fileName, "yaml", frontmatter));
}

module.exports = createPage;