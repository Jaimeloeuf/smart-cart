import type { Cart } from "../types";

/**
 * Utility for generating ISODateTime strings
 */
const generateIsoDateTimeString = (differenceInMilliseconds = 0) =>
  new Date(new Date().getTime() + differenceInMilliseconds).toISOString();

/**
 * Mock cart data expected from API server
 */
export const mockCart: Cart = {
  "1": {
    id: "1",
    name: "Apple",
    quantity: 3,
    unit: "units",
    createdAt: generateIsoDateTimeString(-246400000),
    images: [],
  },
  "2": {
    id: "2",
    name: "Lettuce",
    quantity: 3,
    unit: "units",
    createdAt: generateIsoDateTimeString(-246400000),
    images: [
      "https://post.healthline.com/wp-content/uploads/2020/09/health-benefits-of-apples-732x549-thumbnail-732x549.jpg",
      "https://www.apple.com/v/support/products/n/images/meta/applecare__cw39tloj3vki_og.png?202303282357",
      "https://cdn.dribbble.com/users/3330/screenshots/611655/dri.png",
      "https://www.apple.com/v/support/products/n/images/meta/applecare__cw39tloj3vki_og.png?202303282357",
    ],
  },
  "3": {
    id: "3",
    name: "Rice",
    quantity: 1,
    unit: "bag",
    createdAt: generateIsoDateTimeString(-246400000),
    images: [],
  },
  "4": {
    id: "4",
    name: "Lemon",
    quantity: 3,
    unit: "units",
    createdAt: generateIsoDateTimeString(-246400000),
    images: [],
  },
};
