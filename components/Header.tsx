import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/Header.module.css";
import Pagination from "./Pagination";

const HomeHeader = () => {
  const router = useRouter();
  const ctx = useContext(Ctx);

  //If query undefined due to running on server, defaults to 2022
  const year = router.query.year ? router.query.year : "2022";

  const switchThemeHandler = () => {
    ctx.changeTheme();
  };

  return (
    <header className={styles.header}>
      <span className={styles.year}>{year}</span>
      <Pagination />
      <button
        className={styles["btn-theme"]}
        onClick={switchThemeHandler}
      >
        Change theme
      </button>
    </header>
  );
};

export default HomeHeader;
