import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";

export type CardProps = {
  id: number;
  title: string;
  images: string;
  pageId: number; // Assuming you have a pageId to replace [page] in the path
};

export const Card = ({ title, images, id, pageId }: CardProps) => {
  return (
    <Link href={`/page/[page]/detail/[id]`} as={`/page/${pageId}/detail/${id}`}>
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
