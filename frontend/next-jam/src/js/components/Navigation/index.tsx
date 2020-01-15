import Link from "next/link"


const Navigation = (props) => {

    return (
        <nav>
            <Link href="/FrontPage" as="/"><a>Home</a></Link>
        </nav>
    )
}

export default Navigation