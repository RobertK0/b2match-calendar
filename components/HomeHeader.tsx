import { useRouter } from "next/router";
import React from "react";
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
  return (
    <header className={styles.header}>
      <span>{year}</span>
      <div className={styles.container}>
        <button onClick={pageSwitchHandler.bind(null, false)}>
          {"<"}
        </button>

        <h2>{monthString[+month - 1]}</h2>
        <button onClick={pageSwitchHandler.bind(null, true)}>
          {">"}
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
