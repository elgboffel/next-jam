import styles from "./Spot.scss";
import { ISpot } from "~/src/js/shared-typings/dato-cms/Spot";
import Link from "~/src/js/patches/link";

interface SpotProps extends ISpot {

}

const Spot: React.FC<SpotProps> = (props) => {
    const { link, media, heading } = props;

    if (!link) return <></>;

    return (
        <div className={styles.container}>            
            <img src={media?.url ?? `${link.image?.url}?w=300&h=400&fm=jpg`} />
            <Link id={link?.id}>
                {heading && (
                    <h4>{heading}</h4>
                )}
            </Link>            
        </div>
    );
}

export default Spot;