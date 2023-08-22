export const getGeolocation = (address: string) => {
  const geocoder = new google.maps.Geocoder()

  geocoder.geocode({ address: address }, function (results, status) {
    if (status === 'OK') {
      if (!results || results.length === 0) {
        return undefined
      }
      const latitude = results[0].geometry.location.lat()
      const longitude = results[0].geometry.location.lng()
      console.log(address, { lat: latitude, lng: longitude })
      return { lat: latitude, lng: longitude }
    } else {
      console.error('Geocode was not successful for the following reason: ' + status)
      return undefined
    }
  })
}
