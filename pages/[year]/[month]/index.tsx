import { useRouter } from "next/router";
import React from "react";
import CalendarHeader from "../../../components/CalendarHeader";
import DateCell from "../../../components/DateCell";
import styles from "../../../styles/Calendar.module.css";
import getDates from "../../../utils/getDates";
import HomeHeader from "../../../components/HomeHeader";

const CalendarPage = () => {
  const router = useRouter();

  const year = router.query.year ? router.query.year : "2022";
  const month = router.query.month ? router.query.month : "05";

  let dates = getDates(+year, +month - 1);

  const markup = dates.map((date, index) => (
    <DateCell startingDay={dates[0].getDay()} key={index}>
      {date.getDate()}
    </DateCell>
  ));

  return (
    <main className={styles.main}>
      <HomeHeader />
      <div className={styles["grid-container"]}>
        <CalendarHeader />
        {markup}
      </div>
    </main>
  );
};

export default CalendarPage;
