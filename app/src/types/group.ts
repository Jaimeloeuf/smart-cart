import type { ISODateTimeString } from "./ISODateTimeString";
import type { User } from "./user";

/**
 * Type to represent a single Group
 */
export type Group = {
  /**
   * Unique ID for this group
   */
  id: string;
  createdAt: ISODateTimeString;
  name: string;
  members: Array<User>;
};

export type Groups = Record<Group["id"], Group>;
