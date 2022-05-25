import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/HomeHeader.module.css";

const monthString = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const HomeHeader = () => {
  const router = useRouter();
  const ctx = useContext(Ctx);
  const { month, year } = router.query;
  if (!month || !year) return null;

  const pageSwitchHandler = (next: boolean) => {
    const generateYearAndMonth = () => {
      if (next) {
        return month === "12"
          ? {
              targetMonth: "1",
              targetYear: (+year + 1).toString(),
            }
          : {
              targetMonth: (+month + 1).toString(),
              targetYear: year,
            };
      } else if (!next) {
        return month === "1"
          ? {
              targetMonth: "12",
              targetYear: (+year - 1).toString(),
            }
          : {
              targetMonth: (+month - 1).toString(),
              targetYear: year,
            };
      }
    };

    const target = generateYearAndMonth();

    router.push(`/${target?.targetYear}/${target?.targetMonth}`);
  };

  const switchThemeHandler = () => {
    ctx.changeTheme();
  };

  return (
    <header className={styles.header}>
      <span className={styles.year}>{year}</span>
      <div className={styles.container}>
        <button onClick={pageSwitchHandler.bind(null, false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2>{monthString[+month - 1]}</h2>
        <button onClick={pageSwitchHandler.bind(null, true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
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
