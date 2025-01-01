export function randomNumberPhoto(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randomLocation(min, max) {
  return (Math.random() * (max - min) + min).toFixed(5);
}

export function randomPrice(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randomRooms(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
export function randomGuests(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
