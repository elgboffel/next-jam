import NextLink from 'next/link';
import siteMap from "~/site/site-map";

interface LinkProps {
    id: string,
    name?: string
}

const Link: React.FC<LinkProps> = (props) => {
    const { id, name } = props;

    const page = siteMap[id];

    if (!page) return <></>;

    const link = {
        href: `/${page.template}`,
        as: page.url
    };

    return (
        <NextLink {...link}>
            <a>{name ?? page.name}</a>
        </NextLink>
    )
};

export default Link;