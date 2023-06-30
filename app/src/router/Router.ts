import { createNewRouter } from "./CreateNewRouter";
import { StartRoute, HomeRoute } from "./index";
import { isLoggedIn } from "../utils/auth.mock";

/**
 * Router created for this project
 */
export const router = createNewRouter(
  StartRoute.name,
  HomeRoute.name,
  isLoggedIn
);
