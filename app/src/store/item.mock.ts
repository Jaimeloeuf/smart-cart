import type { Items } from "../types";

/**
 * Utility for generating ISODateTime strings
 */
const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
  new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

// Sort by expiring first
export const mockItems: Items = {
  "1": {
    id: "1",
    name: "apple",
    category: "fruits",
    batches: [
      {
        quantity: 3,
        unit: "units",
        expiry: generateIsoDateTimeString(86400000),
      },
      {
        quantity: 6,
        unit: "units",
        expiry: generateIsoDateTimeString(345600000),
      },
    ],
  },
  "2": {
    id: "2",
    name: "orange",
    category: "fruits",
    batches: [
      {
        quantity: 3,
        unit: "units",
        expiry: generateIsoDateTimeString(345600000),
      },
    ],
  },
  "3": {
    id: "3",
    name: "banana",
    category: "fruits",
    batches: [
      {
        quantity: 3,
        unit: "units",
        expiry: generateIsoDateTimeString(345600000),
      },
    ],
  },
  "4": {
    id: "4",
    name: "lemon",
    category: "fruits",
    batches: [
      {
        quantity: 3,
        unit: "units",
        expiry: generateIsoDateTimeString(345600000),
      },
    ],
  },
};
