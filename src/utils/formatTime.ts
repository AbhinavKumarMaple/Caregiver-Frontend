import dayjs from "../lib/dayjs";

export const formatTime = (date: string | Date, format = "LLL") => {
  return dayjs(date).format(format);
};

export const formatTimeRange = (from: string, to: string) => {
  return `${formatTime(from)} - ${formatTime(to)}`;
};
