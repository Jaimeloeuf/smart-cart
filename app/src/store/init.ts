import { useGroup } from "./group.store";
import { useMisc } from "./misc-data.store";

/**
 * Use this function to initialize all stores that needs
 * to run their init method after login is successful.
 */
export async function initStoresOnLoginSuccess(): Promise<void> {
  console.log(`Running initStoresOnLoginSuccess`);

  // Run all of these initializations without any particular order
  await Promise.all([useGroup().loadGroups(), useMisc().loadData()]);
}

/**
 * Use this function to initialize all stores that needs to
 * run their init method on app start if user is logged in.
 *
 * Can be a fire and forget
 */
export async function initStoresOnAppStartIfLoggedIn(): Promise<void> {
  console.log(`Running initStoresOnAppStartIfLoggedIn`);

  // Run all of these initializations without any particular order
  await Promise.all([useGroup().loadGroups(), useMisc().loadData()]);
}
