export const getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { longitude, latitude } = position.coords;
    console.log(
      `%cLongitude: ${longitude} --- Latitude: ${latitude}`,
      'color: blue'
    );
  });
  // Link to redirect to google maps
  // https://www.google.com/maps/dir/?api=1&origin={orgn.lon,orgn.lat}&destination={dest.lon, dest.lat}
};
