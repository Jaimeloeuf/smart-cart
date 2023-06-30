import { router, StartRoute } from "../router";
import { resetAllPiniaStores } from "./resetAllPiniaStores";

const localStorageAuthKey = "__mock_auth_logged_in";

export const login = () => localStorage.setItem(localStorageAuthKey, "true");

export const logout = () => {
  localStorage.removeItem(localStorageAuthKey);

  router.push({ name: StartRoute.name });

  // Reset all the stores, so that no data is still kept in memory!
  // Can only reset after leaving the UI in case the UI uses data from any of the stores.
  // Use setTimeout to make sure it only runs after the route has been changed
  // to start route since the router.push doesnt run to completion immediately.
  setTimeout(resetAllPiniaStores, 10);
};

export const isLoggedIn = () =>
  localStorage.getItem(localStorageAuthKey) === "true";

export async function isNew() {
  const isNotNew = localStorage.getItem("__mock_auth_is_not_new");
  if (isNotNew !== "true") {
    localStorage.setItem("__mock_auth_is_not_new", "true");
    return true;
  } else {
    return false;
  }
}
