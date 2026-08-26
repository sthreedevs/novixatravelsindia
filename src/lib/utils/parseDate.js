export const parseDate = (dateString) => {
  if (typeof dateString === Date) {
    return dateString;
  }
  return new Date(dateString);
};
