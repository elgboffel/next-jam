import styles from "./AboutPage.module.scss";
import Link from 'next/link';
import matter from "gray-matter";
import { NextPage } from 'next';

interface AboutPageProps {
  content: string,
  data: any
}

const AboutPage: NextPage<AboutPageProps> = (props) => {
  console.log(props)
  const { content, data } = props;

  return (
    <>
      <h1 className={styles.aboutPage}>{data?.title}</h1>
      <p>{content}</p>
      <p>
        <Link href="/AboutPage" as="/about/more-about/" prefetch>
          <a href="/about/more-about">About more</a>
        </Link>
        <Link href="/FrontPage" as="/" prefetch>
          <a href="/">Home</a>
        </Link>
      </p>
    </>
  )
}

AboutPage.getInitialProps = async function (context) {
  const { asPath, req } = context;
  const content = await import(`~/site/content${req?.url ? `${req?.url}` : `${asPath}`}index.md`);
  const data = matter(content.default);

  return {
    ...data
  }
}

export default AboutPage