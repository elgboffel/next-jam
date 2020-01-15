import styles from "./Article.module.scss";
import { NextPage } from 'next';
import Link from "~/src/js/patches/link";
import { getFrontmatterByContext } from "~/src/js/utils/site-helpers/frontmatter";
import { IArticle } from "~/src/js/shared-typings/dato-cms/Article";
import { motion } from "framer-motion";

let easing = [0.175, 0.85, 0.42, 0.96];

const imageVariants = {
  exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
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
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing }
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

interface ArticleProps {
  content: string,
  data: IArticle
};

const Article: NextPage<ArticleProps> = (props) => {
  const { data } = props;

  return (
    <>
      <motion.div initial="exit" animate="enter" exit="exit">
        <motion.img variants={imageVariants} src={`${data.image?.url}?w=99200&h=500&fm=jpg`} />
        <motion.div variants={textVariants}>
          <h1 className={styles.aboutPage}>{data.heading}</h1>
          <p>{data.content}</p>
        </motion.div>
        <motion.div variants={backVariants}>

          <Link id={data.link?.id}/>
        </motion.div>
      </motion.div>
    </>
  )
}

Article.getInitialProps = (context) => getFrontmatterByContext(context); 

export default Article