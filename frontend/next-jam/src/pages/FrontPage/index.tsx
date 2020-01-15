import styles from "./FrontPage.module.scss";
import { NextPage } from 'next';
import { getFrontmatterByContext, getFrontmatterDataByTypeAndId } from "~/src/js/utils/site-helpers/frontmatter";
import { IFrontPage } from "~/src/js/shared-typings/dato-cms/FrontPage";
import Spot from "~/src/js/components/Spot";
import { ISpot } from "~/src/js/shared-typings/dato-cms/Spot";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";



interface FrontPageProps {
    content: string,
    data: IFrontPage
  }

const FrontPage: NextPage<FrontPageProps> = (props) => {
    const { data } = props;
    
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
        >
            <h1 className={styles.container}>Hello world!</h1>
            <div className={styles.spots}>
                {data.spots.map((spot, index) => (
                    <Spot key={index} {...spot} />
                ))}
            </div>
        </motion.div>
    )
}


// interface SpotContainerProps {
//     id: string
// }

// const SpotContainer: React.FC<SpotContainerProps> = (props) => {
//     const { id } = props;
//     const [state, setState] = useState<ISpot>(undefined);

//     useEffect(() => {
//         (async () => setState((await getFrontmatterDataByTypeAndId<ISpot>("spot", id))?.data))();
         
//     }, []);


//     return (
//         <Spot data={state} />
//     )
// }

FrontPage.getInitialProps = (context) => getFrontmatterByContext(context);

export default FrontPage;