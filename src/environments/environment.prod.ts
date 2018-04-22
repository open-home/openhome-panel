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
      garbageDisposal: 'ecolan',
      city: 'lanciano'
    }
  },
  localEndpoints: {
    service: 'http://192.168.1.11:8080/',
    lightList: 'http://192.168.1.11:3000',
    apis: {
      setLightPower: 'lights/power',
      setLightColor: 'lights/color'
    }
  }
};
