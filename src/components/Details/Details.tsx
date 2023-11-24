import { Loader } from "../../components/Loader/Loader";
import { useRouter } from "next/router";
import { useGetCardQuery } from "../../store/api/api";
import Link from "next/link";
import Image from "next/image";
import styles from "./Details.module.css";

export const Details: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetCardQuery(`${id}`);

  return (
    <div className={styles.detailsContainer} data-testid="details">
      <div className={styles.delails}>
        {isLoading && <Loader data-testid="loader" />}
        {!isLoading && (
          <>
            <Link className={styles.close} href={`/page/${router.query.page}`}>
              {" "}
              X
            </Link>
            <div className={styles.title}>{data?.title}</div>
            <Image
              src={data?.images.jpg.image_url || ""}
              className={styles.img}
              alt={data?.title || ""}
              width={200}
              height={300}
              data-testid="card-image"
            />
            <div className={styles.description}>
              <div className={styles.name}>Chapters:</div>
              <div>{data?.chapters || "Chapters not available"}</div>
              <div className={styles.name}>Type:</div>
              <div>{data?.type || "Type not available"}</div>
              <div className={styles.name}>Score:</div>
              <div>{data?.score || "Score not available"}</div>
              <div className={styles.name}>Description: </div>
              <div>{data?.synopsis || "Description not available"}</div>
            </div>
          </>
        )}
      </div>
      <Link className={styles.closeBtn} href={`/page/${router.query.page}`}>
        Closed
      </Link>
    </div>
  );
};
