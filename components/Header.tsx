import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/Header.module.css";
import Pagination from "./Pagination";

const HomeHeader = () => {
  const router = useRouter();
  const ctx = useContext(Ctx);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  //If query undefined due to running on server, defaults to current month
  const year = router.query.year ? +router.query.year : currentYear;
  const month = router.query.month
    ? +router.query.month
    : currentMonth;

  const switchThemeHandler = () => {
    ctx.changeTheme();
  };

  const yearOptions: JSX.Element[] = [];
  for (let i = 1970; i <= 2030; i++)
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );

  const changeYearHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(`/${event.target.value}/${month}`);
    router.push(`/${event.target.value}/${month}`);
  };
  return (
    <header className={styles.header}>
      <select
        className={styles.year}
        value={year}
        onChange={changeYearHandler}
        name="year"
      >
        {yearOptions}
      </select>
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
