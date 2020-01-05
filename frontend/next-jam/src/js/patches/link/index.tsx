import NextLink from 'next/link';
import siteMap from "~/site/site-map";
import { BasePage } from '~/src/js/shared-typings/dato-cms/BasePage';

const Link: React.FC<BasePage> = (props) => {
    let page;

    /* If no name exists get the page from the sitemap */
    if (!props.name) {
        const site = siteMap;
        page = site[props];
    } else {
        /* If name exists set page to props */
        page = {...props};
    }  

    if (!page) return <></>;

    const link = {
        href: `/${page.template}`,
        as: page.url
    }

    return (
        <NextLink {...link}>
            <a>{props.name ?? page.name}</a>
        </NextLink>
    )
}

export default Link;