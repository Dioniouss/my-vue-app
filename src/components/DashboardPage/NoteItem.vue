<template>
    <div class="note">
      <h3 class="note__title">{{ note.title }}</h3>
      <p class="note__content">{{ note.content }}</p>
      <div class="delete-btn-wrapper">
        <button class="delete-btn" @click="deleteNote(note.id)">Удалить</button>
      </div>
    </div>
  </template>
  
<script lang="ts">
import { type PropType } from 'vue';
  
  interface Note {
    id: number;
    title: string;
    content: string;
  }
  
export default {
  name: 'NoteItem',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true,
    },
    deleteNote: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
  },
};
</script>
  
  <style scoped>
  .note {
    position: relative;
    border-radius: 12px;
    padding: 10px;
    background-color: #B1C909;
    width: 500px;
    height: max-content;
    overflow: hidden;
    border-top-right-radius: 40px;
  }
  
  .note::after {
    content: "";
    position: absolute;
    top: -6px;
    right: 0;
    width: 30px;
    height: 30px;
    background: linear-gradient(215deg, transparent 50%, #8A9C06 50%);
    border-bottom-left-radius: 12px;
  }
  
  .note__title {
    color: #fff;
    font: 600 24px/32px;
  }
  
  .note__content {
    color: #fff;
    font: 500 20px/32px;
  }
  
  .delete-btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  
  .delete-btn {
    background-color: #B1C909;
    color: white;
    border: none;
    padding: 5px 10px 5px 30px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .delete-btn::before {
    content: "✖";
    position: absolute;
    left: 8px;
    font-size: 14px;
    color: white;
  }
  
  @media (max-width: 1200px) {
    .note {
      width: 400px;
    }
  }
  
  @media (max-width: 768px) {
    .note {
      width: 100%;
    }
  }
  
  @media (max-width: 360px) {
    .note__title {
      font-size: 18px;
    }
  
    .note__content {
      font-size: 16px;
    }
  }
  </style>
  