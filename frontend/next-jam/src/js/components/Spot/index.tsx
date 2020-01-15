import styles from "./Spot.scss";
import { ISpot } from "~/src/js/shared-typings/dato-cms/Spot";
import Link from "~/src/js/patches/link";
import { motion } from "framer-motion";

const postVariants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
    }
  };

interface SpotProps extends ISpot {

}

const Spot: React.FC<SpotProps> = (props) => {
    const { link, media, heading } = props;

    if (!link) return <></>;

    return (
        <div className={styles.container}>
            <motion.div variants={postVariants}>
                <motion.div whileHover="hover" variants={{ hover: { scale: 0.96 } }}>
                    <img src={media?.url ?? `${link.image?.url}?w=300&h=400&fm=jpg`} />
                </motion.div>
                <Link id={link?.id}>
                    {heading && (
                        <h4>{heading}</h4>
                        )}
                </Link>            
            </motion.div>            
        </div>
    );
}

export default Spot;