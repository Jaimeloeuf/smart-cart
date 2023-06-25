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
      }
    },

    /**
     * Set the current group
     */
    async setCurrentGroup(groupID: Group["id"]) {
      if (!(groupID in this.groups))
        throw new Error("Invalid Group ID used when setting current group");

      this.currentGroupID = groupID;

      // Call API through other stores to load details of the current group
      useItem().loadItems();
      useCart().loadCart();
    },
  },

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

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
