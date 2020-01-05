import styles from "./FrontPage.module.scss";
import { NextPage } from 'next';
import { getFrontmatterByContext } from "~/src/js/utils/site-helpers/frontmatter";
import { IFrontPage } from "~/src/js/shared-typings/dato-cms/FrontPage";
import Spot from "~/src/js/components/Spot/Spot";

interface FrontPageProps {
    content: string,
    data: IFrontPage
  }

const FrontPage: NextPage<FrontPageProps> = (props) => {
    const { data } = props;

    return (
        <>
            <h1 className={styles.container}>Hello world!</h1>
            <div className={styles.spots}>
                {data.spots.map((spot, index) => (
                    <Spot key={index} {...spot} />
                ))}
            </div>

        </>
    )
}

FrontPage.getInitialProps = (context) => getFrontmatterByContext(context);

export default FrontPage;