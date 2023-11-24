import Main from "@/screens/Main/Main";
import React, { FC, PropsWithChildren } from "react";
import styles from "./mainLayout.module.css";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Main />
      {children}
    </div>
  );
};
