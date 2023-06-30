import { defineStore } from "pinia";
import { useWaste } from "./waste.store";
import type { Item, Inventory, ExpiringItem } from "../types";
import { mockInventory } from "./item.mock";
import { numberOfDaysFromToday } from "../utils/numberOfDaysFromToday";

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

    expiringItems(this: { itemsArray: Array<Item> }) {
      // Find all the item batches that are expiring within the week and sort them
      return this.itemsArray
        .map((item) =>
          item.batches
            .filter((batch) => numberOfDaysFromToday(batch.expiry) < 8)
            .map((batch) => ({ ...batch, name: item.name } as ExpiringItem))
        )
        .flat()
        .sort((a, b) =>
          a.expiry < b.expiry ? -1 : a.expiry > b.expiry ? 1 : 0
        );
    },
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
     * Update an existing item in inventory.
     */
    async updateItem(item: Item) {
      // @todo Call API
      this.items[item.id] = item;
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

    /**
     * Throw a grocery out from inventory and record waste
     */
    async throwBatch(
      itemID: Item["id"],
      batchID: Item["batches"][number]["id"]
    ) {
      // @todo Call API

      const item = this.getItem(itemID);
      const batchIndex = item.batches.findIndex(
        (batch) => batch.id === batchID
      );
      // Error state that should not happen but if it does just ignore to prevent breaking
      if (batchIndex === -1) return;

      const [wastedBatch] = item.batches.splice(batchIndex, 1);
      // Error state that should not happen but if it does just ignore to prevent breaking
      if (wastedBatch === undefined) return;

      useWaste().addWaste(item.name, wastedBatch);
    },

    /**
     *
     */
    async finishBatch(
      itemID: Item["id"],
      batchID: Item["batches"][number]["id"]
    ) {
      // @todo Call API

      const item = this.getItem(itemID);
      const batchIndex = item.batches.findIndex(
        (batch) => batch.id === batchID
      );
      // Error state that should not happen but if it does just ignore to prevent breaking
      if (batchIndex === -1) return;
      item.batches.splice(batchIndex, 1);
    },

    /**
     * Delete item from inventory
     */
    async deleteItem(itemID: Item["id"]) {
      // @todo Call API
      delete this.items[itemID];
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
