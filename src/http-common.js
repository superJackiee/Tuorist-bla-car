import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const placeHttpRequest = axios.create({
  baseURL: "http://api.goby24.ch/api/ride/search-location/",
  headers: {
    "Content-type": "application/json",
  },
});

export const placeDetailHttpRequest = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/",
  headers: {
    "Content-type": "application/json",
  },
});

export const googleAPIKey = "AIzaSyD2NVhCGOQphMEo2ay2kBS15Whqki-hjHo";
