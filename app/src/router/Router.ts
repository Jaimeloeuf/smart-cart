import { createNewRouter } from "./CreateNewRouter";

import { StartRoute, HomeRoute } from "./index";
// import { auth } from "../firebase";

/**
 * Force return to be boolean
 *
 * @todo Return true for all routes now
 */
// const authPredicate = () => auth.currentUser !== null;
const authPredicate = () => true;

/**
 * Router created for this project
 */
export const router = createNewRouter(
  StartRoute.name,
  HomeRoute.name,
  authPredicate
);
