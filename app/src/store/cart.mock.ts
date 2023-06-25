import type { Cart } from "../types";

/**
 * Utility for generating ISODateTime strings
 */
const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
  new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

/**
 * Mock cart data expected from API server
 */
export const mockCart: Cart = {
  "1": {
    id: "1",
    name: "apple",
    category: "fruit",
    quantity: 3,
    unit: "units",
    createdAt: generateIsoDateTimeString(-246400000),
  },
  "2": {
    id: "2",
    name: "lettuce",
    category: "vegetable",
    quantity: 3,
    unit: "units",
    createdAt: generateIsoDateTimeString(-246400000),
  },
  "3": {
    id: "3",
    name: "rice",
    category: "staple",
    quantity: 1,
    unit: "bag",
    createdAt: generateIsoDateTimeString(-246400000),
  },
  "4": {
    id: "4",
    name: "lemon",
    category: "fruit",
    quantity: 3,
    unit: "units",
    createdAt: generateIsoDateTimeString(-246400000),
  },
};
