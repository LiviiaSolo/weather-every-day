<template>
  <div
    class="weather"
    :class="
      typeof weather?.main != 'undefined' && weather?.main.temp - 273.15 > 20
        ? 'warm'
        : ''
    "
  >
    <main class="main">
      <div id="main-city">
        <div class="search-box">
          <input
            id="city"
            type="text"
            class="search-bar"
            placeholder="Search..."
            v-model="city"
            @keyup.enter="fetchData"
          />
          <button id="form-btn" @click="fetchData" type="submit">add</button>
          <button id="clear-btn" @click="clearCity" type="button">clear</button>
        </div>
      </div>

      <!-- Повідомлення про помилку -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        <button @click="closeError">Close</button>
      </div>

      <div v-if="weather?.main" class="weather-container">
        <div class="weather-wrap">
          <div class="location-box">
            <div class="location">
              {{ weather?.name }}, {{ weather?.sys.country }}
              <div class="date">{{ dateBuilder() }}</div>
            </div>
            <div id="block-bottom">
              <div class="group-time">
                <p id="time">{{ weather?.time }}</p>
              </div>
            </div>
          </div>

          <div class="weather-box">
            <div class="temp">
              {{ Math.round(weather?.main.temp - 273.15).toFixed(1) }}°c
              <div class="quality">
                <div class="weather-now-temp-minmax">
                  <span class="min-max">
                    Low:
                    {{ Math.round(weather.main.temp_min - 273.15).toFixed() }}°C
                  </span>
                  <span class="min-max">
                    High:{{
                      Math.round(weather.main.temp_max - 273.15).toFixed()
                    }}°C
                  </span>
                </div>
                <div class="humidity-wind">
                  <span class="humidity"
                    >Humidity: {{ weather.main.humidity }}%</span
                  >
                  <span class="humidity"
                    >Wind: {{ Math.round(weather.wind.speed) }} m/s</span
                  >
                </div>
              </div>
              <div class="weather">{{ weather?.weather[0].main }}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useWeatherStore } from "@/store";

export default defineComponent({
  setup() {
    const city = ref("");
    const errorMessage = ref("");

    const store = useWeatherStore();
    const weather = computed(() => store.weatherData);

    async function fetchData() {
      try {
        await store.getWeatherData(city.value);
        if (!store.weatherData || !store.weatherData.main) {
          throw new Error("City not found");
        }
        errorMessage.value = ""; // Очистити повідомлення про помилку, якщо запит успішний
      } catch (error) {
        errorMessage.value = "Такого міста не існує!";
      }
    }

    function clearCity() {
      city.value = ""; // Очищення тексту в полі вводу
    }

    function closeError() {
      errorMessage.value = ""; // Закриття повідомлення про помилку
    }

    function dateBuilder() {
      let d = new Date();

      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      return `${day} ${date} ${month} ${year} ${time} `;
    }

    return {
      city,
      weather,
      errorMessage,
      fetchData,
      clearCity,
      closeError,
      dateBuilder,
    };
  },
});
</script>

<style scoped>
.error-message {
  color: red;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin: 10px auto;
  width: 80%;
}
.error-message button {
  background: transparent;
  border: 1px solid red;
  color: red;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>

