import { defineStore } from "pinia";
import type { WastedItem, Wasted } from "../types";
import { mockWastes } from "./home.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all the items in cart
   */
  wasted: Wasted;
}

/**
 * Use this 'store' to manage the shared group cart.
 */
export const useWasted = defineStore("wasted", {
  state: (): State => ({ wasted: {} }),

  getters: {
    cartArray: (state) => Object.values(state.wasted),
  },

  actions: {
    /**
     * Load cart of the selected group ID
     */
    async loadCart() {
      // @todo Call API
      this.wasted = mockWastes;
    },

    /**
     * Get a single cart item with runtime type checking
     */
    getItem(itemID: WastedItem["id"]): WastedItem {
      const item = this.wasted[itemID];
      if (item) return item;

      throw new Error(`Invalid itemID '${itemID}'`);
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
