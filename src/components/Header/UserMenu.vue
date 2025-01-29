<template>
    <router-link to="/">
      <img src="./assets/logo.svg" alt="logo" width="220" height="50" />
    </router-link>
    <div v-if="userEmail">
      <div class="header__right">
        <router-link to="/dashboard">
          <span class="lk">Личный кабинет {{ userEmail }}</span>
        </router-link>
        <router-link to="/">
          <button class="logout-button" @click="logout">
            <img src="./assets/user.svg" alt="registration" width="56" height="56" />
          </button>
        </router-link>
      </div>
    </div>
    <button v-else class="image-button" @click="openPopup('login')">
      <img src="./assets/button.svg" alt="registration" width="220" height="50" />
    </button>
  </template>
  
<script lang="ts">
import type { PropType } from 'vue';

export default {
  name: 'UserMenu',
  props: {
    userEmail: {
      type: String,
      default: '',
    },
    openPopup: {
      type: Function as PropType<(formType: 'login' | 'register') => void>,
      required: true,
    },
    logout: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
  },
};
</script>
  
  <style scoped lang="css">
  .header__right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .image-button {
  background: none; /* Убираем фон кнопки */
  border: none; /* Убираем стандартную рамку кнопки */
  padding: 0; /* Убираем паддинг, если не нужен */
  cursor: pointer; /* Добавляем курсор "pointer" для улучшения UX */
}
  
.lk {
    color: #B1C909;
}
.logout-button {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}
.logout-button img {
    width: 40px;
    height: 40px;
  }

  .image-button img {
    width: 180px;
    height: auto;
  }
  .header img {
  max-width: 180px;
  height: auto;
}
  /* Кнопки профиля и выхода на мобильных */
@media (max-width: 768px) {
  .header {
    padding: 20px 40px;
  }

  .header img {
    max-width: 140px;
  }

  .header__right {
    flex-direction: column;
    gap: 10px;
  }

  .logout-button img {
    width: 40px;
    height: 40px;
  }

  .image-button img {
    width: 180px;
    height: auto;
  }
}

/* Уменьшаем отступы и текст при узких экранах */
@media (max-width: 360px) {
  .header {
    padding: 15px 20px;
    align-items: center;
    text-align: center;
  }

  .header img {
    max-width: 120px;
  }

  .lk {
    font-size: 14px;
  }

  .logout-button img {
    width: 35px;
    height: 35px;
  }

  .image-button img {
    width: 160px;
  }
}
  </style>
  