const gmAPI = "AIzaSyCG06E9I83k9AzECqqD1HEgQmJlc2Q2ZgQ";
const PROTOCOL = "https://";
const DOMAIN = "maps.googleapis.com";
const GEOPATH = "/maps/api/geocode/";

export const getAddressCoordinates = addressDetails => {
  const { address1, address2, city, state, zip } = addressDetails;

  const FORMAT = "json";
  const QUERY_STRING = `${PROTOCOL}${DOMAIN}${GEOPATH}${FORMAT}?address=${address1}+${address2}+${city}+${state}+${zip}&key=${gmAPI}`;

  return fetch(QUERY_STRING)
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return response;
      }
      return response.json();
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
};
