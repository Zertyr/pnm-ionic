// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  uriAPI: ' http://3.238.238.88/api',
  YOUR_API_KEY: 'YOUR_API_KEY'
};

export const VEHICLES_URL = '/vehicle';

export const INVENTORY_URL = '/inventory';
export const INVENTORY_ITEM_URL = '/inventory/items'
export const INVENTORY_BY_USER_URL = '/inventory/byuser';
export const LAST_INVENTORY_URL_BY_USER_ID = '/inventory/last/byuser';

export const ITEM_URL = '/item'
export const LAST_ITEM_URL = '/lastitem'

export const BOX_URL = "/box"
export const LASTBOX_USER = "/box/lastbox"
export const BOX_ITEM_URL = "/box/generateBoxAndCreateItemBox"


export const ITEM_BOX_URL = "/itembox"


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
