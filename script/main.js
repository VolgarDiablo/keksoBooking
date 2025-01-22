import {
  getRandomValue,
  getRandomArrayElement,
  getRandomArraySubset,
} from "./utils/utils.js";
import { initFormHandlers } from "./formHandlers.js";
import { addMarkersToMap } from "./map.js";

initFormHandlers(".ad-form");

addMarkersToMap(announcements);
