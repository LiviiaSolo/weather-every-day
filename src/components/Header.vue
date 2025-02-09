<template>
  <header>
    <div class="header-container">
      <div class="logo-container">
        <img class="logo" src="../assets/imgon.png" alt="" />
      </div>
      <nav>
        <div class="nav-content">
          <a @click="goToMain" href="#">Home</a>
          <a @click="goToAbout" href="#">About</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();

    const goToMain = () => {
      router.push({ name: "Main" });
    };

    const goToAbout = () => {
      router.push({ name: "About" });
    };

    return {
      goToMain,
      goToAbout,
    };
  },
});
</script>

<style scoped>
.logo-container {
  display: flex;
}
.logo {
  width: 80%;
}
.header-container {
  font-weight: 600;
  font-size: 24px;
  background-image: url(../assets/headerbeg.png);
  background-repeat: no-repeat; 
  background-size: cover;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: space-around;
}

.nav-content {
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  gap: 70px;
}
.nav-content a {
  color: black;
  color: #FFF;
}
</style>
