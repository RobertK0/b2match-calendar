import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../../../../store/ctxProvider";
import Head from "next/head";
import styles from "../../../../styles/Details.module.css";
import getDates from "../../../../utils/getDates";
import validateDate from "../../../../utils/validateDate";

const Details = () => {
  const ctx = useContext(Ctx);
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  const year = router.query.year ? +router.query.year : currentYear;
  const month = router.query.month
    ? +router.query.month
    : currentMonth;
  const date = router.query.day ? +router.query.day : currentDate;

  let dates = getDates(+year, +month - 1);
  if (!validateDate(year, month, date, dates))
    router.replace(`/${currentYear}/${currentMonth}`);

  const dateObj = new Date(year, month - 1, date);

  const events = ctx.events.filter(
    (event) => event.date.toDateString() === dateObj.toDateString()
  );
  const markup = events.map((event, index) => {
    return (
      <div key={index} className={styles.wrapper}>
        <span>{event.date.toLocaleTimeString()}&nbsp;| </span>
        <span>&nbsp; {event.author} &nbsp;</span>
        <span> |&nbsp;{event.message}</span>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>
          Calendar | {router.query.day}/{router.query.month}/
          {router.query.year}
        </title>
      </Head>
      <div
        className={styles["theme-wrapper"]}
        data-theme={ctx.theme}
      >
        <Link href={`/${router.query.year}/${router.query.month}`}>
          <a className={styles["back-button"]}>back</a>
        </Link>
        <main className={styles.main}>
          <div className={styles.card}>
            <span className={styles.title}>{`${
              events.length
            } total commit${
              events.length === 1 ? "" : "s"
            }: `}</span>
            {markup}
          </div>
        </main>
      </div>
    </>
  );
};

export default Details;
