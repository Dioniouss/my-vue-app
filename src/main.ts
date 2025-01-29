import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируем маршрутизатор
import './style.css';

createApp(App)
  .use(router) // Подключаем Vue Router
  .mount('#app');