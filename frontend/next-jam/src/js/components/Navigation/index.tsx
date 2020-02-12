import styles from "./Navigation.module.scss";
import Link from "next/link"
import React from "react";


const Navigation = (props) => {

    return (
        <nav className={styles.navigation}>
            <div className={styles.navigation__content}>
                <Link href="/FrontPage" as="/"><a>Home</a></Link>
                <Link href="/Article" as="/lights"><a>lights</a></Link>
            </div>
        </nav>
    )
}

export default Navigation