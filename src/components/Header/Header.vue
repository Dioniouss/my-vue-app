<template>
  <div class="header">
    <!-- Вставляем новый компонент для меню пользователя -->
    <UserMenu
      :userEmail="userEmail"
      :openPopup="openPopup"
      :logout="logout"
    />

    <!-- Попап с формой входа -->
    <div v-if="isPopupOpen" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <button class="close-btn" @click="closePopup">X</button>
        <LoginForm
          :formType="currentForm"
          @switchForm="switchForm"
          @authSuccess="handleAuthSuccess"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import UserMenu from './UserMenu.vue';
import LoginForm from './LoginForm.vue';

export default {
  name: 'Header',
  components: {
    UserMenu,
    LoginForm,
  },
  setup() {
    const userEmail = ref('');
    const isPopupOpen = ref(false);
    const currentForm = ref<'login' | 'register'>('login');

    const openPopup = (formType: 'login' | 'register') => {
      currentForm.value = formType;
      isPopupOpen.value = true;
    };

    const closePopup = () => {
      isPopupOpen.value = false;
    };

    const switchForm = () => {
      currentForm.value = currentForm.value === 'login' ? 'register' : 'login';
    };

    const handleAuthSuccess = (data: any) => {
      userEmail.value = data.email; // Получаем email из ответа сервера
      localStorage.setItem('accessToken', data.accessToken);
      closePopup();
    };

    const logout = async () => {
      try {
        const response = await fetch('https://dist.nd.ru/api/auth', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          userEmail.value = '';
          localStorage.removeItem('accessToken');
        } else {
          console.error('Ошибка при выходе');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса для выхода:', error);
      }
    };

    const checkToken = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return;
        }

        const response = await fetch('https://dist.nd.ru/api/auth', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          userEmail.value = result.email;
        } else {
          console.error('Ошибка при проверке токена');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса для проверки токена:', error);
      }
    };

    onMounted(() => {
      checkToken();
    });

    return {
      userEmail,
      openPopup,
      closePopup,
      switchForm,
      handleAuthSuccess,
      logout,
      isPopupOpen,
      currentForm,
    };
  },
};
</script>

<style scoped lang="css">
/* Основные стили для домашней страницы */
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

/* Стиль для попапа */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  background: #1B2F46;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  max-width: 90%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* Кнопки для форм */
button {
  padding: 10px 20px;
  border: none;
  background: #4caf50;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button[type='button'] {
  background: #f44336;
}

button:hover {
  opacity: 0.8;
}

/* Стили для хедера */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 80px;
  flex-wrap: wrap;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .header {
    padding: 20px 40px;
  }
}

@media (max-width: 360px) {
  .header {
    padding: 15px 20px;
    align-items: center;
    text-align: center;
  }
}
</style>
