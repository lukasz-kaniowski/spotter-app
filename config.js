module.exports = {
  CONFIG: {
    apiEndpoint: 'http://private-fb018-spotters.apiary-proxy.com',
    deviceOnly: false,	// force app to run on device only
    geoTimeStep: 300000,	// 5 minutes, the time to cache geo location
    defaultLanguage: 'pl',
    geolocationOptions: {maximumAge: 6000, timeout: 10000, enableHighAccuracy: true},
    defaultGeolocation: {
      coords: {
        latitude: 52.230938,
        longitude: 21.009537
      },
      timestamp: 0
    }
  }

};
