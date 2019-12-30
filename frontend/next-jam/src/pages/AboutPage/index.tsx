import styles from "./AboutPage.module.scss";
import Link from 'next/link';
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { NextPage } from 'next';
import { useRouter } from 'next/router'

interface AboutPageProps {
  content: string,
  data: any
}

const AboutPage: NextPage<AboutPageProps> = (props) => { 
  const { content, data } = props;
  
  return (
    <>
        <h1 className={styles.container}>{data?.title}</h1>
        <p>{content}</p>
        <p>
          <Link href="/aboutpage" as="/about/more-about">
            <a>About more</a>
          </Link>
          <Link href="/frontpage" as="/">
            <a>Home</a>
          </Link>
        </p>
    </>
  )
}

AboutPage.getInitialProps = async function(context) {
    const { asPath, query, req } = context;
    console.log("asPath", context)
    const content = await import(`~/site/content${req?.url ? `${req?.url}/` : `${asPath}`}index.md`);
    const data = matter(content.default);
    return {
      ...data
    }
  }

export default AboutPage