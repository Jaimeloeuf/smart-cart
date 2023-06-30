import type { ISODateTimeString } from "./ISODateTimeString";

/**
 * Type to represent a single Wasted Item in the cart
 */
export type WastedItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  wastedAt: ISODateTimeString;
};

/**
 * Type to represent all items of a specific cart
 */
export type Wasted = Record<WastedItem["id"], WastedItem>;
