<template>
  <Header/>

  <section class="home">
    <div class="home__info">
      <h1 class="home__header">Мои заметки</h1>
      <p class="home__header-description">Не забывай о важном, храни его в облаке.</p>
    </div>
    <img src="./assets/home.png" alt="home" width="900" height="900" />
  </section>
</template>

<script lang="ts">
import Header from '../Header/Header.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
  },
};
</script>

<style scoped lang="css">
.home {
  display: flex;
  padding: 0 160px;
  justify-content: space-between;
}

.home__info {
  display: flex;
  padding-top: 230px;
  flex-direction: column;
  gap: 40px;
  width: 300px;
}

.home__header {
  color: #ffffff;
  font-size: 104px;
  margin: 0;
}

.home__header-description {
  color: #9da5af;
  font-size: 32px;
  margin: 0;
}

/* Медиазапрос для экранов с шириной меньше 1200px */
@media (max-width: 1200px) {
  .home {
    padding: 0 80px;
  }

  .home__info {
    padding-top: 100px;
    width: 250px;
  }

  .home__header {
    font-size: 80px;
  }

  .home__header-description {
    font-size: 24px;
  }

  img {
    width: 80%;
    height: auto;
  }
}

/* Медиазапрос для экранов с шириной меньше 768px */
@media (max-width: 768px) {
  .home {
    flex-direction: column;
    padding: 0 20px;
  }

  .home__info {
    padding-top: 50px;
    width: 100%;
    align-items: center;
  }

  .home__header {
    font-size: 56px;
    text-align: center;
  }

  .home__header-description {
    font-size: 20px;
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
  }
}

/* Медиазапрос для экранов с шириной меньше 480px */
@media (max-width: 480px) {
  .home__header {
    font-size: 36px;
  }

  .home__header-description {
    font-size: 18px;
  }
}
</style>
