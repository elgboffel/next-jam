import Navigation from "../Navigation";


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