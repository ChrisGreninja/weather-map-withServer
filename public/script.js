let lat;
let lon;
var dataobj;
var zoom = 13;

var map = L.map("map").setView([0, 0], zoom);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//get location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    sendValueToServer(lat, lon, zoom);
  });
}

//get api data object from server
function sendValueToServer(lat1, lon1, zoom) {
  fetch("/submit-value", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat: lat1, lon: lon1 }),
  })
    .then((response) => response.json())
    .then((data1) => {
      let fetchResult = data1;
      dataobj = fetchResult;
      sendVal(fetchResult);
      map = map.remove();
      mapDec(fetchResult.coord.lat, fetchResult.coord.lon, zoom);
    })
    .catch((error) => {
      console.error(error); // handle any errors
    });
}

/// apply data
function sendVal(result) {
  document.getElementById("temp").innerHTML =
    result.main.temp + "<sup>o</sup> C";
  document.getElementById("minTemp").innerHTML =
    "Maximum temp: " + result.main.temp_min + "<sup>o</sup> C";
  document.getElementById("maxTemp").innerHTML =
    "Maximum temp: " + result.main.temp_max + "<sup>o</sup> C";
  document.getElementById("latt").innerHTML = "latitude: " + result.coord.lat;
  document.getElementById("long").innerHTML = "longitude: " + result.coord.lon;
  const imageURL =
    "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
  document.getElementById("Icon").setAttribute("src", imageURL);
  document.getElementById("description").innerText =
    result.weather[0].description;
  document.getElementById("windSpeed").innerText =
    "wind speed: " + result.wind.speed + "kmph";
  document.getElementById("loctionName").innerText = result.name;
}

////map and map marker
function mapDec(lat, lon, zoom2) {
  map = L.map("map").setView([lat, lon], zoom2);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(`<b>${dataobj.name}</b>`).openPopup();
  document.getElementById("map").addEventListener(
    "wheel",
    function () {
      zoomVal();
    },
    { passive: true }
  );
  map.on("click", async function (e) {
    let zooom = zoom;

    sendValueToServer(e.latlng.lat, e.latlng.lng, zooom);

    marker.setLatLng([e.latlng.lat, e.latlng.lng]);
  });
}

//to get zoom value
function zoomVal() {
  zoom = map.getZoom();
}
