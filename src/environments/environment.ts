// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA6YSPX_S710RuurNJdWkbkeng7eb7kVy4',
    authDomain: 'thin-client-test.firebaseapp.com',
    databaseURL: 'https://thin-client-test.firebaseio.com',
    projectId: 'thin-client-test',
    storageBucket: '',
    messagingSenderId: '265776156937'
  }
};
