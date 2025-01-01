import {
  randomNumberPhoto,
  randomLocation,
  randomPrice,
  randomRooms,
  randomGuests,
} from "./utils/utils.js";

let types = ["palace", "flat", "house", "bungalow"];
let checking = ["12:00", "13:00", "14:00"];
let checkout = ["12:00", "13:00", "14:00"];
let features = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
let photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];

let locationMinX = 35.65;
let locationMinY = 139.7;
let locationMaxX = 35.7;
let locationMaxY = 139.8;

let countCreateObject = 10;

function createAnnouncementObject() {
  return Array(countCreateObject)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      url: `img/avatars/user${randomNumberPhoto(1, 8)}.png`,
      offer: createOffer(),
    }));
}

function createOffer() {
  const address = `${randomLocation(
    locationMinX,
    locationMaxX
  )} ${randomLocation(locationMinY, locationMaxY)}`;

  return {
    title: "Title",
    address: `${randomLocation(locationMinX, locationMaxX)} ${randomLocation(
      locationMinY,
      locationMaxY
    )}`,
    price: `${randomPrice(100, 10000)} UAH`,
    type: `${types[Math.floor(Math.random() * types.length)]}`,
    rooms: `${randomRooms(1, 8)} rooms`,
    guests: `${randomGuests(1, 120)} guests`,
    checking: `${checking[Math.floor(Math.random() * checking.length)]}`,
    checkout: `${checkout[Math.floor(Math.random() * checkout.length)]}`,
    features: `${features[Math.floor(Math.random() * features.length)]}`,
    description: "Description",
    photos: `${photos[Math.floor(Math.random() * photos.length)]}`,
    location: address,
  };
}

const announcements = createAnnouncementObject();
console.log(announcements);
