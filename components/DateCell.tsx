import React, { ReactNode } from "react";
import transformedData from "../models/transformedData";
import styles from "../styles/DateCell.module.css";

const DateCell: React.FC<{
  events: transformedData[];
  children: number;
  startingDay: number;
}> = (props) => {
  const convertedDay =
    props.startingDay === 0 ? 7 : props.startingDay;

  const style =
    props.children === 1 ? { gridColumnStart: convertedDay } : {};

  return (
    <div className={styles.cell} style={style}>
      <div>{props.children}</div>
      {props.events.length > 0
        ? `${props.events.length} commits`
        : ""}
    </div>
  );
};

export default DateCell;
