function getYearsMonthDay(date: Date | string) {
  if (typeof date === "string") {
    const d = new Date(date);
    return getD(d);
  } else {
    return getD(date);
  }
}

const getD = (date: Date) => {
  const year = date.getFullYear(); //  获取年
  const month = date.getMonth(); //  获取月
  const day = date.getDate(); //  获取日
  return {
    year,
    month,
    day
  };
};

export default getYearsMonthDay;
