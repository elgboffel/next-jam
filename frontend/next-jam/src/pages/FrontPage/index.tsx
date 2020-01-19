import styles from "./FrontPage.module.scss";
import { NextPage } from 'next';
import { getFrontmatterByContext } from "~/src/js/utils/site-helpers/frontmatter";
import { IFrontPage } from "~/src/js/shared-typings/dato-cms/FrontPage";
import Spot from "~/src/js/components/Spot";
import { motion } from "framer-motion";



const FrontPage: NextPage<IFrontPage> = (props) => {
    const { spots } = props;
    
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
        >
            <h1 className={styles.container}>Hello world!</h1>
            <div className={styles.spots}>
                {spots.map((spot, index) => (
                    <Spot key={index} {...spot} />
                ))}
            </div>
        </motion.div>
    )
}


FrontPage.getInitialProps = (context) => getFrontmatterByContext(context);

export default FrontPage;