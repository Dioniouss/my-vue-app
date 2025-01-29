<template>
  <Header />
  
  <div class="dashboard">
    <button class="add-note-btn" @click="openPopup">+</button>
    
    <!-- Список заметок -->
    <div class="notes-list">
      <NoteItem
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :deleteNote="deleteNote"
      />
    </div>

    <!-- Попап для создания заметки -->
    <Popup
      :isPopupOpen="isPopupOpen"
      :closePopup="closePopup"
      :createNote="createNote"
      :newNote="newNote"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import Header from '../Header/Header.vue';
import NoteItem from './NoteItem.vue';
import Popup from './Popup.vue';

export default {
  name: 'DashboardPage',
  components: {
    Header,
    NoteItem,
    Popup,
  },
  setup() {
    // Состояние для списка заметок и попапа
    const notes = ref<any[]>([]);
    const isPopupOpen = ref(false);
    const newNote = ref({
      title: '',
      content: '',
    });

    // Открыть попап
    const openPopup = () => {
      isPopupOpen.value = true;
    };

    // Закрыть попап
    const closePopup = () => {
      isPopupOpen.value = false;
      newNote.value = { title: '', content: '' }; // Очистка формы
    };

    const token = localStorage.getItem('accessToken');  // Предполагаем, что токен сохраняется в localStorage

    const getNotes = async () => {
      console.log(token)
      try {
        const response = await fetch('https://dist.nd.ru/api/notes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          notes.value = await response.json();
        } else {
          console.error('Ошибка при получении заметок', response.status);
        }
      } catch (error) {
        console.error('Ошибка при запросе заметок', error);
      }
    };

    const createNote = async () => {
      try {
        const response = await fetch('https://dist.nd.ru/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newNote.value),
        });

        if (response.ok) {
          const createdNote = await response.json();
          notes.value.push(createdNote); // Добавляем заметку в список
          closePopup(); // Закрываем попап
        } else {
          console.error('Ошибка при создании заметки', response.status);
        }
      } catch (error) {
        console.error('Ошибка при запросе на создание заметки', error);
      }
    };

    const deleteNote = async (id: number) => {
      try {
        const response = await fetch(`https://dist.nd.ru/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          notes.value = notes.value.filter(note => note.id !== id); // Удаляем заметку из списка
        } else {
          console.error('Ошибка при удалении заметки', response.status);
        }
      } catch (error) {
        console.error('Ошибка при запросе на удаление заметки', error);
      }
    };

    // Получаем заметки при монтировании компонента
    onMounted(getNotes);

    return {
      notes,
      isPopupOpen,
      newNote,
      openPopup,
      closePopup,
      createNote,
      deleteNote,
    };
  },
};
</script>

<style scoped lang="css">
.dashboard {
  position: relative;
  height: 100vh;
  padding: 0 160px;
}

.add-note-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #B1C909;
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
}

.notes-list {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Медиазапросы для адаптивности */

@media (max-width: 1200px) {
  .dashboard {
    padding: 0 80px;
  }

  .add-note-btn {
    bottom: 15px;
    right: 15px;
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 0 20px;
  }

  .notes-list {
    flex-direction: column;
    gap: 10px;
  }

  .add-note-btn {
    font-size: 18px;
  }
}

@media (max-width: 360px) {
  .add-note-btn {
    font-size: 16px;
  }
}
</style>
