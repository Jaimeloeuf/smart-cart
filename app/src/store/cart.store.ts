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

    /**
     * Add a new item to cart
     */
    async addToCart(item: { name: string; quantity: number; unit: string }) {
      // @todo Call API before pushing locally for pessimistic UI update
      const itemID = Math.trunc(Math.random() * 1000000).toString();

      this.cart[itemID] = {
        ...item,
        id: itemID,
        createdAt: new Date().toISOString(),
        images: [],
      };
    },

    /**
     * Update a single item in cart
     */
    async updateItem(item: CartItem) {
      // @todo Call API before pushing locally for pessimistic UI update
      this.cart[item.id] = item;
    },

    async removeImage(itemID: CartItem["id"], imageLink: string) {
      const cartItem = this.getItem(itemID);
      const index = cartItem.images.findIndex((link) => link === imageLink);

      // @todo Call API
      cartItem.images.splice(index, 1);
    },

    async increaseItemQuantity(itemID: CartItem["id"]) {
      const item = this.cartArray.find((item) => item.id === itemID);
      if (item === undefined)
        throw new Error("Invalid itemID found in increaseItemQuantity");

      // @todo Call API
      item.quantity += 1;
    },

    async decreaseItemQuantity(itemID: CartItem["id"]) {
      const item = this.cartArray.find((item) => item.id === itemID);
      if (item === undefined)
        throw new Error("Invalid itemID found in decreaseItemQuantity");

      // @todo Call API
      if (item.quantity > 1) item.quantity -= 1;
    },

    async removeItem(itemID: CartItem["id"]) {
      // @todo Call API
      delete this.cart[itemID];
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
