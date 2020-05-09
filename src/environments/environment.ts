// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientId: "L15N1RZB7ZaUxYRP3NfWURQ1YFYRINr7",
    clientDomain: "richtillis.auth0.com", // e.g., you.auth0.com
    audience: "http://localhost:1337/", // e.g., http://localhost:1337/
    redirect: "http://localhost:4200/callback",
    scope: "openid profile email"
  },
  firebaseConfig: {
    apiKey: "AIzaSyCKKalZjyW4V3BudM_owx_pDCIFRH2Te1c",
    authDomain: "mealomatic-cf648.firebaseapp.com",
    databaseURL: "https://mealomatic-cf648.firebaseio.com",
    projectId: "mealomatic-cf648",
    storageBucket: "mealomatic-cf648.appspot.com",
    messagingSenderId: "129184481144",
    appId: "1:129184481144:web:19503a81bd3ea31908d28d",
    measurementId: "G-7JBSKBSDXX"
  },
  cloudinary:{
    cloud_name: 'dq8wrsecq',
  },
  apiRoot: "http://localhost:1337" // e.g., http://localhost:1337/ (DO include trailing slash)
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
