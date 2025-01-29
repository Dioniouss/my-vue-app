<template>
    <div>
      <h2>{{ formTitle }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" placeholder="Введите значение" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="form.password" placeholder="Введите пароль" required />
        </div>
  
        <div v-if="isLoginForm">
          <p>У вас нет аккаунта? <span class="switch-form" @click="switchForm">Зарегистрируйтесь</span></p>
          <CustomButton>Войти</CustomButton>
        </div>
        <div v-else>
          <div class="form-group">
            <label for="confirmPassword">Подтвердите пароль</label>
            <input type="password" id="confirmPassword" v-model="form.confirmPassword" placeholder="Подтвердите пароль" required />
          </div>
          <p>У вас есть аккаунт? <span class="switch-form" @click="switchForm">Войдите</span></p>
          <CustomButton>Зарегистрироваться</CustomButton>
        </div>
  
        <span class="error-message">{{ errorInfo }}</span>
      </form>
    </div>
  </template>
  
<script lang="ts">
import { ref } from 'vue';
import CustomButton from '../CustomButton/CustomButton.vue';
  
export default {
  name: 'AuthForm',
  components: {
    CustomButton,
  },
  props: {
    formType: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const errorInfo = ref('');
      
    const isLoginForm = ref(props.formType === 'login');
    const formTitle = ref(isLoginForm.value ? 'Вход в ваш аккаунт' : 'Регистрация');
  
    const switchForm = () => {
      isLoginForm.value = !isLoginForm.value;
      formTitle.value = isLoginForm.value ? 'Вход в ваш аккаунт' : 'Регистрация';
      emit('switchForm');
    };
  
    const submitForm = async () => {
      const url = isLoginForm.value ? '/api/auth' : '/api/reg';
      const data = {
        email: form.value.email,
        password: form.value.password,
        ...(isLoginForm.value ? {} : { confirm_password: form.value.confirmPassword }),
      };
  
      try {
        const response = await fetch('https://dist.nd.ru' + url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
          
        const result = await response.json();
          
        if (response.ok) {
          emit('authSuccess', { accessToken: result.accessToken, email: form.value.email } );
        } else {
          errorInfo.value = result.message;
        }
      } catch (error: any) {
        errorInfo.value = 'Ошибка: ' + error.message;
      }
    };
  
    return {
      form,
      errorInfo,
      isLoginForm,
      formTitle,
      switchForm,
      submitForm,
    };
  },
};
</script>
  

<style lang="css">
.popup h2 {
  text-align: center;
  color: #fff;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  color: #9DA5AF;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  transition: 0.3s ease;
}

.popup p {
    color: #9DA5AF;
}

.form-group input:focus {
  border-color: #8A9C06;
  box-shadow: 0 0 8px rgba(138, 156, 6, 0.6);
}
.login {
    display: flex;
    justify-content: space-between;
}
.error-message {
    color: #FF7461;
}
.switch-form {
  color: #B1C909;
  cursor: pointer;
}
</style>