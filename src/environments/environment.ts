// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  // apiBaseUrl: 'http://localhost:52753',
  // apiBaseUrl: 'http://egraapi.xenovex.com',
  geoserverBaseUrl: 'http://13.71.114.225:8008',
  geoserverStoreName: 'GarudaGIS', // Testing
  // apiBaseUrl: 'http://1.22.172.218:6055',
   apiBaseUrl: 'http://192.168.0.226:6055',
  tokenEndPoint: '/api/token',
  production: false,
  environment: 'Local',
  showEnvironment: true
};
