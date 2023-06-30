import { defineStore } from "pinia";
import type { WastedItems, Item, Batch } from "../types";
import { mockWaste } from "./waste.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all the items in cart
   */
  waste: WastedItems;
}

/**
 * Use this 'store' to manage wasted groceries
 */
export const useWaste = defineStore("waste", {
  state: (): State => ({ waste: {} }),

  getters: {
    /**
     * Waste array sorted by newest thrown first
     */
    wasteArray: (state) =>
      Object.values(state.waste).sort((a, b) =>
        a.wastedAt > b.wastedAt ? -1 : a.wastedAt < b.wastedAt ? 1 : 0
      ),
  },

  actions: {
    /**
     * Load past wasted item from API
     */
    async loadWaste() {
      // @todo Call API
      this.waste = mockWaste;
    },

    /**
     * Add a new item to waste
     */
    async addWaste(itemName: Item["name"], batch: Batch) {
      // @todo Call API
      const wasteID = Math.trunc(Math.random() * 1000000).toString();

      this.waste[wasteID] = {
        id: wasteID,
        name: itemName,
        quantity: batch.quantity,
        unit: batch.unit,
        wastedAt: new Date().toISOString(),
      };
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
