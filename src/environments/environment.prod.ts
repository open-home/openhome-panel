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
    }
  },
  localEndpoints: {
    service: 'http://192.168.1.11:8080/',
    lightList: 'http://192.168.1.11:3000',
    dvrList: 'http://192.168.1.11:3001',
    apis: {
      httpListener: 'httpListener'
    }
  }
};
