import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Импортируем компоненты для страниц
import HomePage from '../components/HomePage/Homepage.vue';
import DashboardPage from '../components/DashboardPage/DashboardPage.vue';

// Создаем массив маршрутов
const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage }, // Главная страница
  { path: '/dashboard', component: DashboardPage }, // Личный кабинет
];

// Создаем экземпляр роутера
const router = createRouter({
  history: createWebHistory('/my-vue-app/'),  // Указываем base путь, который ты использовал в Vite
  routes,
});

export default router;