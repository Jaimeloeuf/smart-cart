import type { ISODateTimeString } from "./ISODateTimeString";

/**
 * Type to represent a single Cart Item in the cart
 */
export type CartItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  createdAt: ISODateTimeString;
};

/**
 * Type to represent all items of a specific cart
 */
export type Cart = Record<CartItem["id"], CartItem>;
