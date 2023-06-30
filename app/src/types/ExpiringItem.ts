import type { ISODateTimeString } from "./ISODateTimeString";

/**
 * Type to represent a single Item in the inventory
 */
export type ExpiringItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  numBatches: number;
  whichBatch: number;
  expiry: ISODateTimeString;
};

/**
 * Type to represent all items of a specific inventory
 */
export type ExpiringInventory = Record<ExpiringItem["id"], ExpiringItem>;
