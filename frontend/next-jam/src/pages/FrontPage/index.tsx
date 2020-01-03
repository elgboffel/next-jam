import styles from "./FrontPage.module.scss";
import { NextPage } from 'next';
import { getFrontmatterByContext } from "~/src/js/utils/site-helpers/frontmatter";
import Link from "~/src/js/patches/link";

interface FrontPageProps {
    content: string,
    data: any
  }

const FrontPage: NextPage<FrontPageProps> = (props) => {
    const { data } = props;

    return (
        <>
            <h1 className={styles.container}>Hello world!</h1>
            <div>
                {data?.links.map(link => (
                    <Link id={link} />
                ))}
            </div>
        </>
    )
}

FrontPage.getInitialProps = (context) => getFrontmatterByContext(context);

export default FrontPage;