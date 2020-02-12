import Navigation from "../Navigation";
import React from "react";


const SiteLayout = (props) => {

    return (
        <>
            <Navigation />
            <main>
                {props.children}
            </main>
        </>
    )
}

export default SiteLayout;