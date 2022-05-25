import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/DateCell.module.css";
import DetailsButton from "./DetailsButton";

type PropType = {
  children: number;
  dates: Date[];
};

const DateCell: React.FC<PropType> = ({ children, dates }) => {
  const ctx = useContext(Ctx);
  const router = useRouter();

  const startingDay = dates[0].getDay();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  //If query undefined due to running on server, defaults to current month
  const year = router.query.year
    ? router.query.year
    : `${currentYear}`;
  const month = router.query.month
    ? router.query.month
    : `${currentMonth}`;

  //If month/year out of range or not an int, return user to default
  if (!Number.isInteger(+month) || +month < 1 || +month > 12)
    router.replace(`/${year}/1`);

  const date = new Date(+year, +month - 1, children);

  const events = ctx.events.filter(
    (event) => event.date.toDateString() === date.toDateString()
  );

  //Converts from Sun-Sat to Mon-Sun
  const convertedDay = startingDay === 0 ? 7 : startingDay;

  //Got to do inline style for this since data attribute for properties
  //other than pseudo-element content is experimental
  const style =
    children === 1 ? { gridColumnStart: convertedDay } : {};

  const showDetailsHandler = () => {
    router.push(`${router.asPath}/${children}`);
  };

  return (
    <div className={`${styles.cell}`} style={style}>
      <span>{children}</span>
      <DetailsButton onClick={showDetailsHandler}>
        {events}
      </DetailsButton>
    </div>
  );
};

export default DateCell;
