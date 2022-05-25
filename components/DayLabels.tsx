import React from "react";
import styles from "../styles/DayLabels.module.css";

const DayLabels = () => {
  return (
    <>
      <strong className={styles.day}>Monday</strong>
      <strong className={styles.day}>Tuesday</strong>
      <strong className={styles.day}>Wednesday</strong>
      <strong className={styles.day}>Thursday</strong>
      <strong className={styles.day}>Friday</strong>
      <strong className={styles.day}>Saturday</strong>
      <strong className={styles.day}>Sunday</strong>
    </>
  );
};

export default DayLabels;
