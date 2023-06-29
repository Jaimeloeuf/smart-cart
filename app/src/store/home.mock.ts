import { Wasted } from "../types/wasted";

/**
 * Utility for generating ISODateTime strings
 */
 const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
 new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

/**
* Mock cart data expected from API server
*/
export const mockWastes: Wasted = {
 "1": {
   id: "1",
   name: "Peanut Butter",
   quantity: 0.25,
   unit: "jar",
   wastedAt: generateIsoDateTimeString(-246400000),
 },
 "2": {
   id: "2",
   name: "Bread",
   quantity: 2,
   unit: "slices",
   wastedAt: generateIsoDateTimeString(-246400000),
 },
};