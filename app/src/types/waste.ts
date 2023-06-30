import type { ISODateTimeString } from "./ISODateTimeString";

/**
 * Type to represent a single Wasted Item
 */
export type WastedItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  wastedAt: ISODateTimeString;
};

/**
 * Type to represent all wasted items
 */
export type WastedItems = Record<WastedItem["id"], WastedItem>;
