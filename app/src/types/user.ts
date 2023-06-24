import type { ISODateTimeString } from "./ISODateTimeString";

/**
 * Type to represent a single User
 */
export type User = {
  /**
   * Unique ID
   */
  id: string;
  createdAt: ISODateTimeString;
  name: string;
};
