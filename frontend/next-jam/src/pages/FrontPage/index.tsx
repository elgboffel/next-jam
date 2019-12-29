import { NextPage } from 'next';
import Link from 'next/link';

const FrontPage: NextPage<{ userAgent: string }> = ({ userAgent }) => <h1>Hello world! - user agent: {userAgent}<Link href="/AboutPage" as="/about"><a>About</a></Link></h1>;

FrontPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || "" : navigator.userAgent;
  return { userAgent };
};

export default FrontPage;