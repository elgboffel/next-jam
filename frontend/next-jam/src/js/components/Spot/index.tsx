import {ISpot} from "~/js/shared-typings/dato-cms/Spot";
import Link from "~/js/patches/link";
import {motion} from "framer-motion";
import styles from "./Spot.module.scss";
import React from "react";

const variants = {
    initial: {scale: 0.96, y: 30, opacity: 0},
    enter: {scale: 1, y: 0, opacity: 1, transition: {duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96]}},
    exit: {
        scale: 0.6,
        y: 100,
        opacity: 0,
        transition: {duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96]}
    }
};


const Spot: React.FC<ISpot> = (props) => {
    const {link, media, heading} = props;

    if (!link) return <></>;

    return (
        <motion.div className={styles.spot} variants={variants}>
            <Link id={link?.id}>
                <>
                    <motion.div whileHover="hover" variants={{hover: {scale: 0.96}}}>
                        {media?.url.indexOf(".mp4") > -1
                            ? <video autoPlay loop><source src={media?.url ?? `${link.image?.url}`} type="video/mp4"/></video>
                            : <img src={media?.url ?? `${link.image?.url}?w=300&h=400&fm=jpg`} alt=""/>
                        }                        
                    </motion.div>
                    <div className={styles.spot__content}>
                    <h4 className="font-bold text-xl mb-2">{link.name ?? heading}</h4>
                    </div>
                </>
            </Link>
        </motion.div>
    );
}

export default Spot;