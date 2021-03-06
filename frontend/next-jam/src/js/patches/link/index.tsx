import React from "react";
import NextLink from 'next/link';
import {siteMap} from "../../../../site/site-map";


interface LinkProps {
    id: string,
    name?: string
}

const Link: React.FC<LinkProps> = (props) => {
    const {id, name} = props;

    const page = siteMap[id];

    if (!page) return <></>;

    const link = {
        href: `/${page.template}`,
        as: page.url
    };
siteMap
    return (
        <NextLink {...link}>
            <a>
                {props.children
                    ? props.children
                    : name ?? page.name
                }
            </a>
        </NextLink>
    )
};

export default Link;