import { defineStore } from "pinia";
import { useItem } from "./item.store";
import { useCart } from "./cart.store";
import type { Group, Groups } from "../types";
import { mockGroups } from "./group.mock";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * A mapping of all groups the user is a member of.
   */
  groups: Groups;

  /**
   * ID of the current group opened in app
   */
  currentGroupID: Group["id"] | undefined;
}

/**
 * Use this 'store' to manage user's groups.
 */
export const useGroup = defineStore("group", {
  state: (): State => ({ groups: {}, currentGroupID: undefined }),

  getters: {
    groupsArray: (state) => Object.values(state.groups),

    /**
     * # ***WARNING***
     *
     * Only use the `group` object of this getter if you are 1000% sure that the
     * `currentGroupID` is set! Since this does type casting to make it easier
     * for store users to access the current group.
     */
    currentGroup: (state) =>
      state.groups[state.currentGroupID as Group["id"]] as Group,
  },

  actions: {
    /**
     * Load all the groups the current user is a member of
     */
    async loadGroups() {
      // @todo Call API
      this.groups = mockGroups;

      // Set first group (if avail) as current group if current group is not set.
      if (this.currentGroupID === undefined) {
        const group = this.groupsArray[0];
        if (group !== undefined) this.setCurrentGroup(group.id);
      } else {
        // If current group is already set, load current group data to make sure
        // it is up to date on app launch.
        this.loadCurrentGroupData();
      }
    },

    /**
     * Load data / details of current group using other stores.
     */
    loadCurrentGroupData() {
      // @todo Use current group ID to load data through the other stores.
      this.currentGroupID;

      // Call API through other stores to load details of the current group
      useItem().loadItems();
      useCart().loadCart();
    },

    /**
     * Set the current group
     */
    setCurrentGroup(groupID: Group["id"]) {
      if (!(groupID in this.groups))
        throw new Error("Invalid Group ID used when setting current group");

      this.currentGroupID = groupID;

      // Load group data after changing current group
      this.loadCurrentGroupData();
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
