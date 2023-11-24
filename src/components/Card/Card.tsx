import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";
import { useRouter } from "next/router";
import { FC } from "react";

export type CardProps = {
  id: number;
  title: string;
  images: string;
};

export const Card: FC<CardProps> = ({ title, images, id }) => {
  const router = useRouter();

  return (
    <Link href={`/page/${router.query.page}/detail/${id}`}>
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
