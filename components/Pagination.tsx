import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Pagination.module.css";

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

const Pagination = () => {
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  //If query undefined due to running on server, defaults to current month
  const year = router.query.year
    ? router.query.year
    : `${currentYear}`;
  const month = router.query.month
    ? router.query.month
    : `${currentMonth}`;

  const pageSwitchHandler = (next: boolean) => {
    const target = (() => {
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
    })();

    router.push(`/${target?.targetYear}/${target?.targetMonth}`);
  };
  return (
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
  );
};

export default Pagination;
