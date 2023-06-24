import type { Groups } from "../types";

/**
 * Utility for generating ISODateTime strings
 */
const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
  new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

/**
 * Mock groups data expected from API server
 */
export const mockGroups: Groups = {
  "1": {
    id: "1",
    createdAt: generateIsoDateTimeString(-246400000),
    name: "Tan Family 🫶🏻",
    members: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "JJ",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Randall",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Valerie",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Agatha",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Gwyneth",
      },
    ],
  },
  "2": {
    id: "2",
    createdAt: generateIsoDateTimeString(-246400000),
    name: "OGP Pantry 🇸🇬🫡",
    members: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "JJ",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Randall",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Valerie",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Agatha",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Gwyneth",
      },
    ],
  },
  "3": {
    id: "3",
    createdAt: generateIsoDateTimeString(-246400000),
    name: "NTU Dorm 👯✨",
    members: [
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "JJ",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Randall",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Valerie",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Agatha",
      },
      {
        id: Math.trunc(Math.random() * 1000000).toString(),
        createdAt: generateIsoDateTimeString(-246400000),
        name: "Gwyneth",
      },
    ],
  },
};
