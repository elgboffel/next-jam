import styles from "./Article.module.scss";
import matter from "gray-matter";
import { NextPage } from 'next';
import Link from "~/src/js/patches/link";

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

Article.getInitialProps = async function (context) {
  const { asPath, req } = context;
  const content = await import(`~/site/content${req?.url ? `${req?.url}` : `${asPath}`}index.md`);
  const data = matter(content.default);

  return {
    ...data
  }
}

export default Article