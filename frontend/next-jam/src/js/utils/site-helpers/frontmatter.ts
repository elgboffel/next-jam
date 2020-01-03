import siteMap from "~/site/site-map";
import matter from "gray-matter";
import { NextPageContext } from "next";

export const getFrontmatterById = async (id: string) => {

    if (!id) return;

    const page = siteMap[id];
    const content = await import(`~/site/content${page?.url}index.md`);
    const data = matter(content.default);

    return {
        ...data
    };
};

export const getFrontmatterByContext = async (context: NextPageContext) => {
    const { asPath, req } = context;
    const pathToMarkdown = `${req?.url ? `${req?.url}` : `${asPath}`}`;
    const content = await import(`~/site/content${pathToMarkdown}index.md`);
    const data = matter(content.default);
  
    return {
      ...data
    }
};