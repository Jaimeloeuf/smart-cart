import { defineStore } from "pinia";
import type { CartItem, Cart } from "../types";
import { mockCart } from "./cart.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all the items in cart
   */
  cart: Cart;
}

/**
 * Use this 'store' to manage the shared group cart.
 */
export const useCart = defineStore("cart", {
  state: (): State => ({ cart: {} }),

  getters: {
    cartArray: (state) => Object.values(state.cart),
  },

  actions: {
    /**
     * Load cart of the selected group ID
     */
    async loadCart() {
      // @todo Call API
      this.cart = mockCart;
    },

    /**
     * Get a single cart item with runtime type checking
     */
    getItem(itemID: CartItem["id"]): CartItem {
      const item = this.cart[itemID];
      if (item) return item;

      throw new Error(`Invalid itemID '${itemID}'`);
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
