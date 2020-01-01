import siteMap from "~/site/site-map";
import constants from "../../../../build/dato-cms/constants";
import matter from "gray-matter";

export const getFrontmatter = async (id: string) => {

    if (!id) return;

    const page = siteMap[id];
    const content = await import(`~/${constants.contentRootPath}${page?.url}index.md`);
    const data = matter(content.default);

    return {
        ...data
    };
};