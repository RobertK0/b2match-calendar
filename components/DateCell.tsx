import { useRouter } from "next/router";
import React, { useContext } from "react";
import Ctx from "../store/ctxProvider";
import styles from "../styles/DateCell.module.css";
import DetailsButton from "./DetailsButton";

type PropType = {
  children: number;
  startingDay: number;
};

const DateCell: React.FC<PropType> = ({
  children,
  startingDay,
}) => {
  const ctx = useContext(Ctx);
  const router = useRouter();

  //If query undefined due to running on server, defaults to 05/2022
  const year = router.query.year ? router.query.year : "2022";
  const month = router.query.month ? router.query.month : "05";
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
