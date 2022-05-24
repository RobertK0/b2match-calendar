import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CalendarHeader from "../../../components/CalendarHeader";
import DateCell from "../../../components/DateCell";
import styles from "../../../styles/Calendar.module.css";
import getDates from "../../../utils/getDates";
import getData from "../../../apis/getData";
import transformData from "../../../utils/transformData";
import type commit from "../../../models/commit";
import type transformedData from "../../../models/transformedData";

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

const CalendarPage = () => {
  const [data, setData] = useState<transformedData[]>([]);
  const router = useRouter();

  useEffect(() => {
    getData("facebook", "create-react-app").then(
      (res: commit[]) => {
        setData(res.map((element) => transformData(element)));
      }
    );
  }, [setData]);

  const { month, year } = router.query;
  if (!month || !year) return null;

  let dates = getDates(+year, +month - 1);

  const markup = dates.map((date, index) => {
    const events = data.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
    return (
      <DateCell
        events={events}
        startingDay={dates[0].getDay()}
        key={index}
      >
        {date.getDate()}
      </DateCell>
    );
  });

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
    <main>
      <header>
        <h2>{`${monthString[+month - 1]} ${year}`}</h2>
        <button onClick={pageSwitchHandler.bind(null, false)}>
          {"<<"}
        </button>
        <button onClick={pageSwitchHandler.bind(null, true)}>
          {">>"}
        </button>
      </header>
      <div className={styles["grid-container"]}>
        <CalendarHeader />
        {markup}
      </div>
    </main>
  );
};

export default CalendarPage;
