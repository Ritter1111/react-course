import { CardData } from "@/types/types";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css";

export interface CardList {
  cards: CardData[];
}

export const CardList: React.FC<CardList> = ({ cards }) => {
  return (
    <div className={styles.container}>
      {!cards ||
        (cards.length === 0 && (
          <h2 className={styles.not_found}>No data received</h2>
        ))}
      {cards.map((item) => (
        <div className="card" key={item.mal_id}>
          <Card
            key={item.mal_id}
            title={item.title}
            images={item.images?.jpg.image_url}
            id={item.mal_id}
          />
        </div>
      ))}
    </div>
  );
};
