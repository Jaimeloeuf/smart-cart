import { defineStore } from "pinia";
import { useItem } from "./item.store";
import { useCart } from "./cart.store";
import { useWasted } from "./home.store";
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
      // If somehow the currentGroupID is invalid, choose a new current groupID to set.
      if (
        this.currentGroupID === undefined ||
        this.groups[this.currentGroupID] === undefined
      ) {
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
      useWasted().loadWastedItems();
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

    /**
     * Get group object of given `groupID`
     */
    getGroup(groupID: Group["id"]) {
      const group = this.groups[groupID];

      if (group === undefined)
        throw new Error("Invalid Group ID used while getting");

      return group;
    },

    /**
     * Create a new group
     */
    createNewGroup(groupName: string) {
      // @todo call API to create new group
      const groupID = Math.trunc(Math.random() * 1000000).toString();

      this.groups[groupID] = {
        id: groupID,
        createdAt: new Date().toISOString(),
        name: groupName,
        members: [
          {
            id: Math.trunc(Math.random() * 1000000).toString(),
            createdAt: new Date().toISOString(),
            name: "JJ",
          },
        ],
      };

      this.setCurrentGroup(groupID);
    },

    /**
     * Update a group's name
     */
    updateGroupName(groupID: Group["id"], groupName: string) {
      // @todo Call API
      this.getGroup(groupID).name = groupName;
    },
  },

  /**
   * Persist state to localStorage.
   */
  persist: true,
});
