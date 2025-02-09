<template>
  <div class="about-container">
    <div class="about">
      <h1 class="about-today">Weather Every Day program</h1>
      <p>
        Weather Every Day is a web application that allows you to get the weather forecast 
        for any location simply by entering the name of the city. The app uses an API to 
        fetch weather data. It shows temperature fluctuations throughout the day and also 
        provides humidity and wind information.
      </p>
      <p>
        The application is built using web technologies like Vue.js, HTML, CSS, 
        and JavaScript, making it lightweight and fast.
      </p>
      <p>
        Weather-Every-Day is simple and intuitive, helping you quickly find out 
        the weather forecast for the day.
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style>
.about-container {
  background-image: url("../assets/bobor.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 26px;

}
.about {
  width: 46%;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.20);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border-radius: 50px;
  transition: 0.4s;
}
.about-today {
  font-size: 28px;
  font-weight: 500;
  color: #000;
  text-align: center;
  padding: 20px;
}
.about p {
  font-size: 20px;
  font-weight: 500;
  line-height: 26px;
  padding: 4px 26px;
  text-align: justify;
}
</style>
