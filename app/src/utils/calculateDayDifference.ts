const today = new Date().getTime();

/**
 * Calculate date differences and return integer representing difference between
 * given date and today in number of days.
 *
 * Uses a fixed today date which is set on page load, since it doesnt really
 * matter if it is not the most up to date as it will get refreshed again when
 * user opens the app again.
 */
export const calculateDayDifference = (date: string) =>
  Math.round((Date.parse(date) - today) / 86400000);
