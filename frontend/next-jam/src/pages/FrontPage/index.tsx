import styles from "./FrontPage.module.scss";
import { NextPage } from 'next';
import Link from 'next/link';

const FrontPage: NextPage = () => <h1 className={styles.container}>Hello world! <Link href="/AboutPage" as="/about-us/"><a>About</a></Link></h1>;

export default FrontPage;