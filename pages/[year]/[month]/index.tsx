import { useRouter } from "next/router";
import React, { useContext } from "react";
import DayLabels from "../../../components/DayLabels";
import DateCell from "../../../components/DateCell";
import styles from "../../../styles/Home.module.css";
import getDates from "../../../utils/getDates";
import Header from "../../../components/Header";
import Ctx from "../../../store/ctxProvider";
import Head from "next/head";
import validateDate from "../../../utils/validateDate";

const CalendarPage = () => {
  const router = useRouter();
  const ctx = useContext(Ctx);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  //If query undefined due to running on server, defaults to current month
  const year = router.query.year ? router.query.year : currentYear;
  const month = router.query.month
    ? +router.query.month
    : currentMonth;

  //If month/year out of range or not an int, return user to default
  if (!validateDate(+year, +month))
    router.replace(`/${currentYear}/${currentMonth}`);

  //Gets all dates for selected year and month in an array
  let dates = getDates(+year, +month - 1);

  const markup = dates.map((date, index) => (
    <DateCell dates={dates} key={index}>
      {date.getDate()}
    </DateCell>
  ));

  return (
    <>
      <Head>
        <title>
          Calendar | {month}/{year}
        </title>
      </Head>

      <div
        className={styles["theme-wrapper"]}
        data-theme={ctx.theme}
      >
        <main className={styles.main}>
          <Header />
          <div className={styles["grid-container"]}>
            <DayLabels />
            {markup}
          </div>
        </main>
      </div>
    </>
  );
};

export default CalendarPage;
