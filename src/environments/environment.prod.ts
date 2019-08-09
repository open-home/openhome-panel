export const environment = {

  production: true,
  remoteEndpoints: {
    openWeatherMap: {
      appId: 'c4b330326668c08cb0fec51d13c6ea74',
      city: '3175173',
      service: 'http://api.openweathermap.org/data/2.5/',
      dailyWeather: 'weather?id=@city&appid=@appId'
    },
    homeCloudServices: {
      service: 'https://us-central1-home-cloud-services.cloudfunctions.net/',
      thermostat: 'thermostat',
      garbageDisposal: 'ecolan',
      city: 'lanciano'
    },
    lifx: {
      service: 'https://api.lifx.com/v1/',
      token: 'c42e8fb7391fece027d73ae0ff0167f1eac0e23f7a1cd1144463200c0b52fb3c',
      lights: {
        base: 'lights/',
        toggle: '/toggle',
        state: '/state',
        all: '/all'
      }
    },
    piSwitch: {
      gate: 'http://kkidhome.ddnspro.org:8000/switch',
      carGate: 'http://kkidhome.ddnspro.org:8001/switch',
    },
  },
  localEndpoints: {
    service: 'http://192.168.1.11:8080/',
    lightList: 'http://192.168.1.11:3000',
    dvrList: 'http://192.168.1.11:3001',
    thermostatList: 'http://192.168.1.11:3002',
    apis: {
      httpListener: 'httpListener'
    }
  }
};
