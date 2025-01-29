<template>
  <div id="app">
    <main class="main">
                <RouterView /> <!-- Здесь будет отображаться содержимое активного маршрута -->
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style> 
  .main {
    background-color: #0A1F38;
  }
</style>