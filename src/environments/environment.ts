// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  uriAPI: 'https://e6e3-2a01-cb0d-a054-191d-40e4-7cb9-66c6-d51a.eu.ngrok.io/api',
  YOUR_API_KEY: 'GOOGLE_API_KEY'
};

export const INVENTORY_BY_USER_URL = '/inventory/byuser';
export const INVENTORY_ITEM_URL = '/inventory/items'

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
