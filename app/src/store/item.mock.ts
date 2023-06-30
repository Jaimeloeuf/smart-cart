import type { Inventory } from "../types";

/**
 * Utility for generating ISODateTime strings
 */
const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
  new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

/**
 * Mock inventory data expected from API server
 */
export const mockInventory: Inventory = {
  "1": {
    id: "1",
    name: "Apple",
    category: "Fruits & Vegetables",
    batches: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 3,
        unit: "unit",
        purchaseDate: generateIsoDateTimeString(-246400000),
        expiry: generateIsoDateTimeString(246400000),
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 6,
        unit: "unit",
        purchaseDate: generateIsoDateTimeString(-345600000),
        expiry: generateIsoDateTimeString(1045600000),
      },
    ],
  },
  "2": {
    id: "2",
    name: "Orange",
    category: "Fruits & Vegetables",
    batches: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 3,
        unit: "unit",
        purchaseDate: generateIsoDateTimeString(-345600000),
        expiry: generateIsoDateTimeString(345600000),
      },
    ],
  },
  "3": {
    id: "3",
    name: "Banana",
    category: "Fruits & Vegetables",
    batches: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 3,
        unit: "unit",
        purchaseDate: generateIsoDateTimeString(-645600000),
        expiry: generateIsoDateTimeString(645600000),
      },
    ],
  },
  "4": {
    id: "4",
    name: "Lemon",
    category: "Fruits & Vegetables",
    batches: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 3,
        unit: "unit",
        purchaseDate: generateIsoDateTimeString(-745600000),
        expiry: generateIsoDateTimeString(745600000),
      },
    ],
  },
  "5": {
    id: "5",
    name: "Spring Onion",
    category: "Fruits & Vegetables",
    batches: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 1,
        unit: "stalk",
        purchaseDate: generateIsoDateTimeString(-246400000),
        expiry: generateIsoDateTimeString(86400000),
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: 5,
        unit: "stalks",
        purchaseDate: generateIsoDateTimeString(-345600000),
        expiry: generateIsoDateTimeString(604800000),
      },
    ],
  },
};
