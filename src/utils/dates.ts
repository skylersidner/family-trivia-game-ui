const formatDate = (date: Date | string): string => {
  let localDate;
  if (typeof date === "string") {
    localDate = new Date(date);
  } else {
    localDate = date;
  }
  return localDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default formatDate;
