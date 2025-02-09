import axios from "axios";

const API_KEY = "145ba74c7f8a045fb0edf8154e0ab867";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function getWeatherData(city) {
  return axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
}
