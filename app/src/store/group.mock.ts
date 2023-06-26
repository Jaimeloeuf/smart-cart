import type { Groups } from "../types";

/**
 * Utility for generating ISODateTime strings
 */
const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
  new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

/**
 * Utility for generating random group ID to mock data
 */
const generateRandomGroupID = () =>
  (Math.random() + 1).toString(36).substring(2);

const grp1ID = generateRandomGroupID();
const grp2ID = generateRandomGroupID();
const grp3ID = generateRandomGroupID();

/**
 * Mock groups data expected from API server
 */
const groups: Groups = {
  [grp1ID]: {
    id: grp1ID,
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
  [grp2ID]: {
    id: grp2ID,
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
  [grp3ID]: {
    id: grp3ID,
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

export const mockGroups = groups;
