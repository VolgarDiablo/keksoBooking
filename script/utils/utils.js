export function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randomLocation(min, max) {
  return (Math.random() * (max - min) + min).toFixed(5);
}

export function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomArraySubset(array) {
  const length = getRandomValue(1, array.length);
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, length);
}
