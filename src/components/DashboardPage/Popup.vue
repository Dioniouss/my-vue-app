<template>
    <div v-if="isPopupOpen" class="popup-overlay" @click.self="closePopup">
      <div class="popup">
        <button class="close-btn" @click="closePopup">X</button>
        <h2>Добавление заметки</h2>
        <form @submit.prevent="createNote">
          <div class="form-group">
            <label for="title">Название заметки</label>
            <input
              type="text"
              id="title"
              v-model="newNote.title"
              required
              maxlength="100"
            />
            <p class="char-counter">{{ newNote.title.length }}/100</p>
          </div>
          <div class="form-group">
            <label for="content">Текст заметки</label>
            <textarea
              id="content"
              v-model="newNote.content"
              required
              maxlength="500"
            ></textarea>
            <p class="char-counter">{{ newNote.content.length }}/500</p>
          </div>
          <div class="form-actions">
            <CustomButton>Добавить</CustomButton>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script lang="ts">
import CustomButton from '../CustomButton/CustomButton.vue';
  
export default {
  name: 'Popup',
  components: {
    CustomButton
  },
  props: {
    isPopupOpen: Boolean,
    closePopup: Function,
    createNote: Function,
    newNote: Object
  }
};
</script>
  
  <style scoped>
  .popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: #1B2F46;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  max-width: 90%;
  position: relative;
}

.popup .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  transition: 0.3s ease;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.form-actions button {
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  background: #4CAF50;
  color: white;
  border: none;
}

.form-actions button[type="button"] {
  background: #f44336;
}

.char-counter {
  font-size: 12px;
  color: gray;
  text-align: right;
  margin-top: 2px;
}
  </style>
  