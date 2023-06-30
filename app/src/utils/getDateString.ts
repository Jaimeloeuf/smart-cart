import type { ISODateTimeString } from "../types";

const formatter = new Intl.DateTimeFormat("default", {
  weekday: "long",
  month: "long",
  day: "2-digit",
});

/**
 * Simple utility function to convert isoDateTimeString to localeDateString
 */
export const getDateString = (isoDateTimeString: ISODateTimeString) =>
  formatter.format(new Date(isoDateTimeString));
