/**
 * Type to represent a single Batch detail
 */
export type Batch = {
  /**
   * Unique ID for this batch, this is **NOT** the item ID
   */
  id: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expiry: string;
};

/**
 * Type to represent a single Item in the inventory
 */
export type Item = {
  id: string;
  name: string;
  category: string;
  batches: Array<Batch>;
};

/**
 * Type to represent all items of a specific inventory
 */
export type Inventory = Record<Item["id"], Item>;
