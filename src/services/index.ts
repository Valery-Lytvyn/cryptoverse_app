export const dateConverter = (date: number) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};
