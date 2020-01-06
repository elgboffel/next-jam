import styles from "./Spot.scss";
import { ISpot } from "~/src/js/shared-typings/dato-cms/Spot";
import Link from "~/src/js/patches/link";

interface SpotProps {
    data: ISpot
}

const Spot: React.FC<SpotProps> = (props) => {
    const { data } = props;

    if (!data?.id) return <></>;

    return (
        <div className={styles.container}>
            <img src={data.media?.url} />
            <Link id={data.id}>
                {data.heading && (
                    <h4>{data.heading ?? data.id}</h4>
                )}
            </Link>            
        </div>
    );
}

export default Spot;