// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {

  production: false,
  remoteEndpoints: {
    openWeatherMap: {
      appId: 'c4b330326668c08cb0fec51d13c6ea74',
      city: '3175173',
      service: 'http://api.openweathermap.org/data/2.5/',
      iconService: 'http://openweathermap.org/img/w/',
      dailyWeather: 'weather?id=@city&appid=@appId'
    },
    // Official Openhome Cloud Services.
    homeCloudServices: {
      service: 'https://us-central1-home-cloud-services.cloudfunctions.net/',
      garbageDisposal: 'ecolan',
      thermostat: 'thermostat',
      city: 'lanciano'
    }
  },
  localEndpoints: {
    service: 'http://localhost:8080/',
    lightList: 'http://localhost:3000',
    dvrList: 'http://localhost:3001',
    thermostatList: 'http://localhost:3002',
    apis: {
      httpListener: 'httpListener'
    }
  }
};
