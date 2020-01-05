import siteMap from "~/site/site-map";
import matter, { GrayMatterFile } from "gray-matter";
import { NextPageContext } from "next";

export const getFrontmatterById = async <T>(id: string) => {

    if (!id) return;

    const page = siteMap[id];
    const content = await import(`~/site/content${page?.url}index.md`);
    const data = matter(content.default);

    return {
        content: data.content,
        data: data.data as T
      }
};

export const getFrontmatterByContext = async <T>(context: NextPageContext) => {
    const { asPath, req } = context;
    const pathToMarkdown = `${req?.url ? `${req?.url}` : `${asPath}`}`;
    const content = await import(`~/site/content${pathToMarkdown}index.md`);
    const data = matter(content.default);
  
    return {
      content: data.content,
      data: data.data as T
    }
};