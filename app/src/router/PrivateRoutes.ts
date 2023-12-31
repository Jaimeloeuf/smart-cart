import type { RouteLocationNormalized } from "vue-router";
import type { PrivateRoute } from "./RouteTypes";
import { AuthType } from "./AuthType";

/*
  Define all Private Route Objects here, before adding them to the
  type checking array defined at the bottom of this module.

  const assertion is needed to tell TS to use stricter types, by
  treating string types like the `name` property as a string literal
  type instead of a string type (ie dont widen any types), so that
  it can be properly inferred for `PrivateRouteNames`.
*/

/* ================================== Core Module Routes =============================== */

export const SignupRoute = <const>{
  name: "signup",
  path: "/signup",
  component: () => import("../views/core/auth/Signup.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const WelcomeRoute = <const>{
  name: "welcome",
  path: "/welcome",
  component: () => import("../views/core/Welcome.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const HomeRoute = <const>{
  name: "home",
  path: "/home",
  component: () => import("../views/core/Home.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: true },
};

/* ================================== Group Routes =============================== */

export const CreateGroupRoute = <const>{
  name: "group-create",
  path: "/group/create",
  component: () => import("../views/core/group/CreateGroup.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const GroupCreatedRoute = <const>{
  name: "group-created",
  path: "/group/created",
  component: () => import("../views/core/group/GroupCreated.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const GroupDetailsRoute = <const>{
  name: "group-details",
  path: "/group/details/:groupID",
  props: true,
  component: () => import("../views/core/group/GroupDetails.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const EditGroupRoute = <const>{
  name: "group-edit",
  path: "/group/edit/:groupID",
  props: true,
  component: () => import("../views/core/group/EditGroup.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

/* ================================== Inventory Routes =============================== */

export const InventoryRoute = <const>{
  name: "inventory",
  path: "/inventory",
  component: () => import("../views/core/inventory/Inventory.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: true },
};

export const ItemDetailRoute = <const>{
  name: "inventory-item-detail",
  path: "/inventory/item-detail/:itemID",
  props: true,
  component: () => import("../views/core/inventory/ItemDetail.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const EditInventoryItemRoute = <const>{
  name: "inventory-edit-item",
  path: "/inventory/edit-item/:itemID",
  props: true,
  component: () => import("../views/core/inventory/EditInventoryItem.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const AddItemRoute = <const>{
  name: "add-item",
  path: "/inventory/add/item",
  // Props used to pass in default quantity and units using "Push to Inventory" feature
  props: (route: RouteLocationNormalized) => route.query,
  component: () => import("../views/core/inventory/AddToInventory.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const AddBatchRoute = <const>{
  name: "add-batch",
  path: "/inventory/add/batch/:itemID",
  // Props used to pass in default quantity and units using "Push to Inventory" feature
  props: (route: RouteLocationNormalized) => ({
    ...route.params,
    ...route.query,
  }),
  component: () => import("../views/core/inventory/AddNewBatch.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

/* ================================== Cart Routes =============================== */

export const CartRoute = <const>{
  name: "cart",
  path: "/cart",
  component: () => import("../views/core/cart/Cart.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: true },
};

export const AddToCartRoute = <const>{
  name: "cart-add-item",
  path: "/cart/add-item",
  component: () => import("../views/core/cart/AddToCart.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const CartItemDetailRoute = <const>{
  name: "cart-item-detail",
  path: "/cart/item-detail/:cartItemID",
  props: true,
  component: () => import("../views/core/cart/CartItemDetail.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

export const EditCartItemRoute = <const>{
  name: "cart-edit-item",
  path: "/cart/edit-item/:cartItemID",
  props: true,
  component: () => import("../views/core/cart/EditCartItem.vue"),
  meta: { AuthRequirements: AuthType.Private, showNavBar: false },
};

/**
 * This array is only used internally for typechecking and type creation purposes
 * only, and is never used as a value anywhere, therefore there is no need to worry
 * about this array's runtime cost as this will be tree shaked away as dead code.
 *
 * Add all route objects defined in this file to this array for typechecking to
 * ensure that the route objects satisfies the `PrivateRoute` type constrain using
 * the `satisfies` operator.
 *
 * Typechecking is done here instead of doing it for every Route Object individually
 * as the RouteObjects cannot be annotated with the `PrivateRoute` type directly at the
 * point of creation as that will widen the RouteObject type to be that of `PrivateRoute`
 * and ignore the const assertion, which is critical for treating the `name` field as
 * a string literal type for `PrivateRouteNames` type to be properly inferred.
 */
const PrivateRoutes = [
  SignupRoute,
  WelcomeRoute,
  HomeRoute,
  CreateGroupRoute,
  GroupCreatedRoute,
  GroupDetailsRoute,
  EditGroupRoute,
  InventoryRoute,
  ItemDetailRoute,
  EditInventoryItemRoute,
  AddItemRoute,
  AddBatchRoute,
  CartRoute,
  AddToCartRoute,
  CartItemDetailRoute,
  EditCartItemRoute,
] satisfies Array<PrivateRoute>;

/**
 * Sum type of all Private Route object names, used to constrain
 * function parameters' type instead of just accepting string type.
 */
export type PrivateRouteNames = (typeof PrivateRoutes)[number]["name"];
