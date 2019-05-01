const getUserLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    location => resolve(location),
    error => reject(error),
  )
});

const watchUserLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.watchPosition(
    location => resolve(location),
    error => reject(error),
  )
});

export default {
  getUserLocation,
  watchUserLocation,
  getUserLatLon: (location: Position) => ({
    lat: location.coords.latitude,
    lon: location.coords.longitude,
  }),
};
