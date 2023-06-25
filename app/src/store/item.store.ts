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
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
