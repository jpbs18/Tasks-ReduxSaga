export const toDisplayDateFormat = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleDateString("en-US", {
    month: "short",
  })} ${date.getFullYear()} ${date.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
};
