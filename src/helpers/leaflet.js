import "leaflet/dist/leaflet.css";
import L from "leaflet";

//icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconshadow from "leaflet/dist/images/marker-shadow.png";

//properties til icons
let myIcon = L.icon({
  iconUrl: icon,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -40],
  shadowUrl: iconshadow,
});

//globale variables
let myMap;
let marker;

export const initMap = (cordinates) => {
  myMap = L.map("mapContainer");

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  myMap.setView(cordinates, 10);
  marker = L.marker(cordinates, { myIcon }).addTo(myMap);
};

export const changeMapView = (cordinates, popupText) => {
  marker.setLatLng(cordinates).bindPopup(popupText).openPopup();
  myMap.setView(cordinates, 13);
};

//fjerner kortet når componet forlades (clean up function)
export const removeMap = () => {
  if (myMap) {
    myMap.off();
    myMap = null;
    //myMap.remove()
  }
};
