/**
 * Base Meta Details type for route objects to use
 */
type BaseMetaDetails = { AuthRequirements: AuthType; showNavBar: boolean };

/**
 * RouteObject enforces the type of the meta property to be an object
 * with an explicit AuthRequirement specified.
 *
 * The meta property is NOT optional because even though routes like the
 * '404 catch all' does not need to have any AuthRequirements specified,
 * these type of routes are not defined in this `Routes` array as it is
 * only for User defined Route Objects.
 */
export interface RouteObject extends RouteRecordRaw {
  meta: BaseMetaDetails;
}

/**
 * A Private route requires AuthRequirements to be specified as Private only
 */
export interface PrivateRoute extends RouteObject {
  meta: BaseMetaDetails & { AuthRequirements: AuthType.Private };
}

/**
 * A public route requires AuthRequirements to be specified as Public or PublicOnly
 */
export interface PublicRoute extends RouteObject {
  meta: BaseMetaDetails & {
    AuthRequirements: AuthType.Public | AuthType.PublicOnly;
  };
}
