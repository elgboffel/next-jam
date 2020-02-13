import styles from "./Article.module.scss";
import {NextPage} from 'next';
import Link from "~/js/patches/link";
import {getFrontmatterByContext} from "~/js/utils/site-helpers/frontmatter";
import {IArticle} from "~/js/shared-typings/dato-cms/Article";
import {motion} from "framer-motion";
import React from "react";

let easing = [0.175, 0.85, 0.42, 0.96];

const imageVariants = {
    exit: {y: 150, opacity: 0, transition: {duration: 0.5, ease: easing}},
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: easing
        }
    }
};

const textVariants = {
    exit: {y: 100, opacity: 0, transition: {duration: 0.5, ease: easing}},
    enter: {
        y: 0,
        opacity: 1,
        transition: {delay: 0.1, duration: 0.5, ease: easing}
    }
};

const backVariants = {
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: easing
        }
    },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
            ease: easing
        }
    }
};

const Article: NextPage<IArticle> = (props) => {
    const {image, heading, content, link} = props;

    return (
        <motion.article className={styles.article} initial="exit" animate="enter" exit="exit">
            <motion.img variants={imageVariants} src={`${image?.url}?w=1200&h=700&fm=jpg`}/>
            <motion.div variants={textVariants}>
                <h1>{heading}</h1>
                <div className={styles.article__content} dangerouslySetInnerHTML={{__html: content}}/>
            </motion.div>
            <motion.div variants={backVariants}>
                <Link id={link?.id}>
                    Go to {link.name}
                </Link>
            </motion.div>
        </motion.article>
    )
}

Article.getInitialProps = (context) => getFrontmatterByContext(context);

export default Article