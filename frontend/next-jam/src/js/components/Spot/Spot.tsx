import styles from "./Spot.scss";
import { ISpot } from "~/src/js/shared-typings/dato-cms/Spot";
import Link from "~/src/js/patches/link";


const Spot: React.FC<ISpot> = (props) => {
    console.log(props)
    if (!props.id) return <></>;

    return (
        <div className={styles.container}>
            <img src={props.media?.url} />
            <Link id={props.id}>
                {props.heading && (
                    <h4>{props.heading ?? props.id}</h4>
                )}
            </Link>            
        </div>
    );
}

export default Spot;