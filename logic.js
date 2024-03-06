let VEHICLE_ID, lat, long;
var TEXT = `Guru Nanak School @ 6:36AM
Labour Office, BKK Rd @ 6:35AM
Birubari Bazar @ 6:31AM
Sanskriti The Gurukul @ 6:00AM`;
var response = {
  status: 0,
  data: [{ v_id: 38, o_id: 1, p_id: 2999, p_n: "Pearl" }],
};

var mapresponse = {
  lat: "26.10389",
  lon: "91.71948",
  speed: 0,
  lastseen: 1708843112,
  bearing: 200,
  direction: "Facing South",
  landmarks: "",
  near: "Sanskriti The Gurukul",
  address:
    "Opp - Sanskriti The Gurukul School, AHOM GAON, Guwahati, Assam 781035, India",
};

async function clicklogin(e) {
  e.preventDefault();
  const mobileInput = document.getElementById("mobile");
  const passwordInput = document.getElementById("password");

  //   var result = await fetch(
  //     `https://server.technomediasoft.com/RaProxy/forward/RouteAlertServer4p0/login?source=pwa_login&j_username=${mobileInput}&j_password=${passwordInput}`
  //   );
  //   let response = await result.json();
  //   console.log(response)
  if (response.status === 0) {
    VEHICLE_ID = response.data[0].v_id;
    window.location = "home.html";
  } else {
    console.log(response.message);
  }
}

function parseText(text) {
  const lines = text.split("\n");
  const locations = [];

  lines.forEach((line) => {
    const [location, time] = line.split(" @ ");
    const formattedTime = time.trim();
    locations.push([location.trim(), formattedTime]);
  });

  return locations;
}

async function getmap() {
  //   var result = await fetch(
  //     `https://server.technomediasoft.com/RaProxy/forward/RouteAlertServer4p0/login?source=gvl_pwa&v_id=${VEHICLE_ID}`
  //   );
  //   let mapresponse = await result.json();
  //   console.log(mapresponse);

  lat = parseFloat(mapresponse.lat);
  long = parseFloat(mapresponse.lon);

  initMap();
  populateCrossedStops();
  document.getElementById("vehicleName").textContent = mapresponse.vehicle_name;
  document.getElementById("speed").textContent = mapresponse.speed + " km";
  document.getElementById("facing").textContent = mapresponse.direction;
  document.getElementById("lastSeen").textContent = lastseen( mapresponse.last_seen_time);
  document.getElementById("near").textContent = mapresponse.near;
  document.getElementById("address").textContent = mapresponse.address;
}

function lastseen(lastS){

	return lastS;
}

//custom marker
let customIcon = {
  iconUrl: "image.png",
  iconSize: [60, 60],
};
let myIcon = L.icon(customIcon);
let iconOptions = {
  title: "Route Alert",
  draggable: true,
  icon: myIcon,
};

// Function to initialize the map
function initMap() {
  var map = L.map("map").setView([lat, long], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, long], iconOptions).addTo(map);
}

// Call the function to initialize the map

function openUrl() {
  window.location.href = `https://maps.google.com/maps?q=${lat},${long}&&z=16`;
}

// JSON array of crossed stops
//parsing near cross text in to array
var crossedStopsData = parseText(TEXT);

// Function to create table rows for crossed stops dynamically
function populateCrossedStops() {
  var crossedStopsTable = document.getElementById("crossed-stops");
  crossedStopsData.forEach(function (stop) {
    var row = crossedStopsTable.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.textContent = stop[0];
    cell2.textContent = stop[1];
  });
}

// Call the function to populate crossed stops


// Function to refresh the page
function refreshPage() {
  location.reload();
}

// Function to share location information on WhatsApp
function shareOnWhatsApp() {
  var message =
    "RouteAlert:\n\nSTG Route 22\nSpeed: 0 kmph\nFacing South East\nLast Seen @ 17-Jan-2024 02:03 PM\nNear: Sanskriti The Gurukul\nOpp - Sanskriti The Gurukul School, AHOM GAON, Guwahati, Assam 781035, India";
  crossedStopsData.forEach(function (stop) {
    message += "\n\nCrossed Stop: " + stop[0] + "\nTime: " + stop[1];
  });

  // Encode message for a WhatsApp link
  var encodedMessage = encodeURIComponent(message);

  // Generate WhatsApp link
  var whatsappLink = "https://wa.me/?text=" + encodedMessage;

  // Open WhatsApp link in a new window
  window.open(whatsappLink);
}
