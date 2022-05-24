const getDates = (year: number, month: number): Date[] => {
  const startDate = new Date(year, month, 1);

  const dates: Date[] = [];

  while (startDate.getMonth() === month) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};

export default getDates;
