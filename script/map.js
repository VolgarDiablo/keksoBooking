import { renderCard } from "./renderCards.js";
import { fetchAnnouncements } from "./api.js";

const mapFilters = document.getElementById("map__filters");
const adFilters = document.getElementById("ad-form");
const setPointTokyo = [35.67267785620779, 139.75866624868985];
const inputAddress = document.getElementById("address");

const mainPinIcon = L.icon({
  iconUrl: "./img/main-pin.svg",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const pinIcon = L.icon({
  iconUrl: "./img/pin.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export function setPageInactive() {
  stateElementsForm(mapFilters, true);
  stateElementsForm(adFilters, true);
}

setPageInactive();

function setPageActive() {
  stateElementsForm(mapFilters, false);
  stateElementsForm(adFilters, false);
}

export function stateElementsForm(form, state) {
  Array.from(form.elements).forEach((element) => {
    element.disabled = state;
  });
}

const map = L.map("map-canvas").setView(setPointTokyo, 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const mainMarker = L.marker(setPointTokyo, {
  icon: mainPinIcon,
  draggable: true,
}).addTo(map);

mainMarker.on("move", (event) => {
  const { lat, lng } = event.target.getLatLng();
  inputAddress.value = `${lat}, ${lng}`;
});

let markersLayer = L.layerGroup().addTo(map);
let allAnnouncements = [];

function addMarkersToMap(announcements) {
  // markersLayer.clearLayers();

  announcements.slice(0, 10).forEach((announcement) => {
    const marker = L.marker(
      [announcement.offer.location.x, announcement.offer.location.y],
      { icon: pinIcon }
    );

    markersLayer.addLayer(marker);

    marker.bindPopup(renderCard(announcement));

    marker.on("popupopen", (e) => {
      console.log("Попап открылся:", e);
      console.log("Контент попапа:", e.popup.getContent());
    });
  });
}

// Фильтрация меток
function filterVisibleMarkers() {
  const bounds = map.getBounds();

  const visibleAnnouncements = allAnnouncements.filter((announcement) => {
    const { x, y } = announcement.offer.location;
    return bounds.contains([x, y]);
  });

  addMarkersToMap(visibleAnnouncements);
}

async function loadAnnouncements() {
  try {
    allAnnouncements = await fetchAnnouncements();
    filterVisibleMarkers();
  } catch (error) {
    console.error("Не удалось загрузить данные:", error);
    alert("Ошибка загрузки данных. Попробуйте обновить страницу.");
  } finally {
    setPageActive();
  }
}

map.whenReady(() => {
  setPageActive();
  inputAddress.value = `${setPointTokyo[0]}, ${setPointTokyo[1]}`;
  loadAnnouncements();
});

// map.on("move", () => {
//   map.closePopup();
// });

map.on("moveend", filterVisibleMarkers);
