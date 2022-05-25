import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../../../../store/ctxProvider";
import Head from "next/head";
import styles from "../../../../styles/Details.module.css";

const Details = () => {
  const ctx = useContext(Ctx);
  const router = useRouter();
  if (
    !router.query.year ||
    !router.query.month ||
    !router.query.day
  )
    return <></>;
  const date = new Date(
    +router.query.year,
    +router.query.month - 1,
    +router.query.day
  );
  const events = ctx.events.filter(
    (event) => event.date.toDateString() === date.toDateString()
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
            } total commit${events.length > 1 ? "s" : ""}: `}</span>
            {markup}
          </div>
        </main>
      </div>
    </>
  );
};

export default Details;
