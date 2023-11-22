import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";

export type CardProps = {
  id: number;
  title: string;
  images: string;
};

export const Card = ({ title, images, id }: CardProps) => {
  return (
    <Link
      href={`detail/${id}${window.location.search}`}
      data-testid="card-container"
    >
      <div className={styles.container}>
        <Image
          className={styles.img}
          src={images}
          width={200}
          height={300}
          alt={title}
          data-testid="card-image"
        />
        <h4 className={styles.title}>{title}</h4>
      </div>
    </Link>
  );
};
