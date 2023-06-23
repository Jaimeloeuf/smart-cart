import { defineStore } from "pinia";
import type { Item, Inventory } from "../types";
import { mockInventory } from "./item.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all the items
   */
  items: Inventory;
}

/**
 * Use this 'store' to control the global loader component.
 */
export const useItem = defineStore("item", {
  state: (): State => ({ items: {} }),

  actions: {
    /**
     * Load items of a selected group ID
     */
    async loadItems() {
      // @todo Call API
      this.items = mockInventory;
    },

    getItem(itemID: Item["id"]): Item {
      const item = this.items[itemID];
      if (item) return item;

      throw new Error(`Invalid itemID '${itemID}'`);
    },
  },

  getters: {
    itemsArray: (state) => Object.values(state.items),
  },

  /**
   * Persist item state in local storage.
   */
  persist: true,
});
