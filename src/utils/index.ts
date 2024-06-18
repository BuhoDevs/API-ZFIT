export const getIsoDate = (date: string): string => {
  const toDateFormat = new Date(date);
  return toDateFormat.toISOString();
};

export const getDefaultDates = () => {
  const today = new Date();
  const endDate = today;

  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - 1);
  startDate.setDate(12);

  return { startDate, endDate };
};
