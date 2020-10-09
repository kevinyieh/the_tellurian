const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const formatDate = (date) => {
  const daysOfWeek = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  const obj = new Date(date);
  const month = months[obj.getMonth()];
  const day = obj.getDate();
  const year = obj.getFullYear();
  const dayOfWeek = daysOfWeek[obj.getDay()];
  return `${dayOfWeek}, ${month} ${day}, ${year}`;
};
