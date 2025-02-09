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
          <div class="input-container">
            <input
              id="city"
              type="text"
              class="search-bar"
              placeholder="City"
              v-model="city"
              @keyup.enter="fetchData"
            />
          
            <button
              v-if="city"
              class="clear-btn"
              @click="clearCity"
              type="button"
              aria-label="Clear input"
            >
            change 
            </button>
            <WeatherComponent
      :weatherData="weatherData"
      @updateWeather="updateWeatherData"
      v-if="weatherData"
    />
          </div>
          <button id="form-btn" @click="fetchData" type="submit">Search</button>
          
        </div>
      </div>
      <!-- Error message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
        <button @click="closeError">X</button>
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
        errorMessage.value = ""; // Clear error message if request is successful
      } catch (error) {
        errorMessage.value = "City not found";
      }
    }

    function clearCity() {
      city.value = ""; // Clearing text in an input field
    }

    function closeError() {
      errorMessage.value = ""; // Closing the error message
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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.error-message {
  font-weight: 500;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e30f52;
  background-color: #ffe6e6;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  margin: 10px auto;
  width: 40%;
}
.error-message button {
  background: transparent;
  border: none;
  color: #000;
  transform: translateX(-10%);
  cursor: pointer;
  border-radius: 5px;
}

/* last variant */
.input-container {
  position: relative;
  display: flex;
  width: 100%;
}
.search-bar {
  width: 100%;
  padding: 10px 30px 10px 10px;
  color: #313131;
  font-size: 16px;
  appearance: none;
  border: none;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  transition: 0.4s;
  cursor: pointer;
}
.clear-btn {
  background-color: rgba(255, 255, 255, 0.01);
  color: #fff;
  border: none;
  border: 1px solid #fff;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.clear-btn:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.clear-btn:focus {
  outline: none;
}
#form-btn {
  width: 30%;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  color: #000;
  border: 1px transparent;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
}
#form-btn:hover {
  justify-content: center;
  background-color: #dcdcdc;
}
.weather-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather {
  background-image: linear-gradient(
    to bottom,
    rgba(109, 3, 3, 0.25),
    rgba(27, 25, 25, 0.75)
  );
  background-image: url("../assets/about.jpg");
  background-size: cover;
  background-position: left;
  transition: 0.4s;
}
.weather.warm {
  background-image: url("../assets/about1.jpg");
  background-size: cover;
  background-position: left;
  transition: 0.4s;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#main-city {
  display: flex;
  justify-content: space-between;
  width: 60%;
  min-width: 300px;
  margin: 0 auto;
}

.search-box {
  width: 80%;
  margin-bottom: 30px;
  display: flex;
  gap: 24px;
  margin: 20px auto 10px;
}

#block-bottom {
  display: flex;
}
.group-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
#current-time {
  margin: 0 0 7px 10px;
  font-size: 32px;
}
.location-box .location {
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.5);
  gap: 30px;
}
.location-box .date {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 20px 45px;
  color: #f258f7;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.5);
  font-size: 82px;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 50px;
  margin: 20px 0;
}
.min-max {
  display: flex;
  padding: 0 0 20px 0;
}
.humidity {
  padding: 0 20px;
}
.weather-box .weather {
  background: none;
  color: #f258f7;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.5);
  font-size: 38px;
  font-weight: 700;
  font-style: italic;
}
.quality {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #fff;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.5);
  font-size: 22px;
  font-weight: 800;
  font-style: italic;
  margin-top: 12px;
}

</style>


