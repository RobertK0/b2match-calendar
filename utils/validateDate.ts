const validateDate = (
  year = 1980,
  month = 1,
  date = 1,
  dates: Date[] = []
) => {
  let maxDate =
    dates.length > 0 ? dates[dates.length - 1].getDate() : 31;

  return Number.isInteger(year) &&
    year > 1970 &&
    year < 2030 &&
    Number.isInteger(month) &&
    month > 0 &&
    month < 13 &&
    Number.isInteger(date) &&
    date > 0 &&
    date <= maxDate
    ? true
    : false;
};

export default validateDate;
