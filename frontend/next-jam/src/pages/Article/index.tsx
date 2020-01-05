import styles from "./Article.module.scss";
import { NextPage } from 'next';
import Link from "~/src/js/patches/link";
import { getFrontmatterByContext } from "~/src/js/utils/site-helpers/frontmatter";
import { IArticle } from "~/src/js/shared-typings/dato-cms/Article";

interface ArticleProps {
  content: string,
  data: IArticle
};

const Article: NextPage<ArticleProps> = (props) => {
  const { data } = props;

  return (
    <>
      <h1 className={styles.aboutPage}>{data.heading}</h1>
      <p>{data.content}</p>
      <p>
        <Link id={data.link?.id}/>
      </p>
    </>
  )
}

Article.getInitialProps = (context) => getFrontmatterByContext(context); 

export default Article