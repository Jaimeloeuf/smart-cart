import { defineStore } from "pinia";
import type { Item, Inventory } from "../types";
import { mockInventory } from "./item.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all the items in inventory
   */
  items: Inventory;
}

/**
 * Use this 'store' to manage inventory.
 */
export const useItem = defineStore("item", {
  state: (): State => ({ items: {} }),

  getters: {
    itemsArray: (state) => Object.values(state.items),
  },

  actions: {
    /**
     * Load items of a selected group ID
     */
    async loadItems() {
      // @todo Call API
      this.items = mockInventory;
    },

    /**
     * Get a single item with runtime type checking
     */
    getItem(itemID: Item["id"]): Item {
      const item = this.items[itemID];
      if (item) return item;

      throw new Error(`Invalid itemID '${itemID}'`);
    },

    /**
     * Add a new item to inventory
     */
    async addItem(item: {
      name: string;
      category: string;
      quantity: number;
      unit: string;
      purchaseDate: string;
      expiry: string;
    }) {
      // @todo Call API before pushing locally for pessimistic UI update
      const itemID = Math.trunc(Math.random() * 1000000).toString();

      this.items[itemID] = {
        id: itemID,
        name: item.name,
        category: item.category,

        // Use given data as the first batch
        batches: [
          {
            id: Math.trunc(Math.random() * 1000000).toString(),
            quantity: item.quantity,
            unit: item.unit,
            purchaseDate: item.purchaseDate,
            expiry: item.expiry,
          },
        ],
      };
    },

    /**
     * Add a new batch to an existing item.
     */
    async addBatch(
      itemID: Item["id"],
      item: {
        quantity: number;
        unit: string;
        purchaseDate: string;
        expiry: string;
      }
    ) {
      // @todo Call API before pushing locally for pessimistic UI update
      this.getItem(itemID).batches.push({
        id: Math.trunc(Math.random() * 1000000).toString(),
        quantity: item.quantity,
        unit: item.unit,
        purchaseDate: item.purchaseDate,
        expiry: item.expiry,
      });
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
