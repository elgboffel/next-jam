import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    InfiniteHits,
    SearchBox,
    Highlight,
    Configure,
} from "react-instantsearch-dom";
import styles from "./Search.module.scss";
import Link from "~/js/patches/link";
import {motion} from "framer-motion";

const variants = {
    initial: {scale: 0.96, y: 30, opacity: 0},
    enter: {scale: 1, y: 0, opacity: 1, transition: {duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96]}},
    exit: {y: 0, opacity: 0, transition: {duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96]}}
};

const searchClient = algoliasearch(
    "RIT2X6A5LM",
    "4e1333d64b01e41cf47782463afcc28a"
);

type Hit = {
    id: string,
    heading: string
    content: string,
    image: string
}

interface HitProps {
    hit: Hit
}

const Hit: React.FC<HitProps> = (props) => {
    const {hit} = props;

    return (
        <motion.div className={styles.search__item}>
            <Link id={hit.id}>
                {hit.image && (
                    <img src={hit.image} alt=""/>
                )}
                <div className={styles.search__itemContent}>
                    <h4>{hit.heading}</h4>
                </div>
            </Link>
        </motion.div>
    );
}

const Search: React.FC = () => {

    return (
        <motion.div variants={variants}>
            <InstantSearch
                indexName="mccode_content_index"
                searchClient={searchClient}
            >
                <div className={styles.search}>
                    <Configure hitsPerPage={10}/>
                    <div className={styles.search__box}>
                        <SearchBox showLoadingIndicator/>
                    </div>
                    <InfiniteHits
                        className={styles.search__results}
                        hitComponent={Hit}
                        translations={{
                            loadPrevious: "Load previous",
                            loadMore: "Load more",
                        }}/>
                </div>
            </InstantSearch>
        </motion.div>
    );
};

export default Search;