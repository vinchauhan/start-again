// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



/* Localhost */
const apiCM = 'http://localhost:8080/cm/';
const apiPLC = 'http://localhost:8080/plc/';
const apiDMD = 'http://localhost:8080/dmd/';

// const apiCM = 'http://rmappt23.qcorpaa.aa.com:9082/cm/';
// const apiPLC = 'http://rmappt23.qcorpaa.aa.com:9088/plc/';
// const apiDMD = 'http://rmappt23.qcorpaa.aa.com:9080/dmd/';


export const environment = {
  production: false,
  showStatus: true,
  allMarkets: apiCM + 'all-markets',
  userMarkets: apiCM + 'user-markets',
  poolCodes: apiPLC + 'holiday-poolcodes',
  cabins: apiCM + 'cabins',
  demand: apiDMD + 'demand'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
