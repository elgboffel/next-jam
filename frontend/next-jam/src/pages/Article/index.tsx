import styles from "./Article.module.scss";
import { NextPage } from 'next';
import Link from "~/src/js/patches/link";
import { getFrontmatterByContext } from "~/src/js/utils/site-helpers/frontmatter";

interface ArticleProps {
  content: string,
  data: any
}

const Article: NextPage<ArticleProps> = (props) => {
  const { data } = props;

  return (
    <>
      <h1 className={styles.aboutPage}>{data?.heading}</h1>
      <p>{data.content}</p>
      <p>
        <Link id={data.link}/>
      </p>
    </>
  )
}

Article.getInitialProps = (context) => getFrontmatterByContext(context); 

export default Article