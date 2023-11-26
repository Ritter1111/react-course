import React, { FC, PropsWithChildren } from "react";
import { CardList } from "../CardList/CardList";
import { CardSearch } from "../CardSearch/CardSearch";
import { ErrorBtn } from "../Error/ErrorBtn/ErrorBtn";
import { Pagination } from "../Pagination/Pagination";
import { SelectPageSize } from "../SelectPageSize/SelectPageSize";
import { CardData, IPagination } from "@/types/types";
import styles from "./mainLayout.module.css";

export interface ICardProps {
  pagination: IPagination;
  cards: CardData[];
}

export const MainLayout: FC<PropsWithChildren<ICardProps>> = ({
  cards,
  pagination,
  children,
}) => {
  return (
    <div className={styles.container} data-testid="main">
      <div className={styles.app}>
        <ErrorBtn />
        <CardSearch />
        <SelectPageSize />
        <CardList cards={cards} />
        <Pagination pageInfo={pagination} />
      </div>
      {children}
    </div>
  );
};
