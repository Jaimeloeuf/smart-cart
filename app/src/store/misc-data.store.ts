import { defineStore } from "pinia";
import { categories, units } from "./misc-data.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all possible item categories
   */
  categories: Array<string>;

  /**
   * A mapping of all possible item quantity units
   */
  units: Array<string>;
}

/**
 * Use this 'store' to manage misc app data.
 */
export const useMisc = defineStore("misc", {
  state: (): State => ({ categories: [], units: [] }),

  actions: {
    /**
     * Load misc data from API
     */
    async loadData() {
      // @todo Call API
      this.categories = categories;
      this.units = units;
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
