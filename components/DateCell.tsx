import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/DateCell.module.css";

type PropType = {
  children: number;
  startingDay: number;
};

const DateCell: React.FC<PropType> = (props) => {
  const ctx = useContext(Ctx);
  const router = useRouter();

  //If query undefined due to running on server, defaults to 05/2022
  const year = router.query.year ? router.query.year : "2022";
  const month = router.query.month ? router.query.month : "05";
  const date = new Date(+year, +month - 1, props.children);

  const events = ctx.events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );

  //Converts from Sun-Sat to Mon-Sun
  const convertedDay =
    props.startingDay === 0 ? 7 : props.startingDay;

  const style =
    props.children === 1 ? { gridColumnStart: convertedDay } : {};

  const showDetailsHandler = () => {
    router.push(`${router.asPath}/${props.children}`);
  };

  return (
    <div className={`${styles.cell}`} style={style}>
      <span>{props.children}</span>
      {events.length > 0 ? (
        <button onClick={showDetailsHandler}>{`● ${events.length} ${
          events.length > 1 ? "commits" : "commit"
        }`}</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default DateCell;
