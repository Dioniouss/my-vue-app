<template>
    <button 
      :style="buttonStyle" 
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
  
export default defineComponent({
  name: 'CustomButton',
  props: {
    width: {
      type: String,
      default: 'max-content',
    },
    height: {
      type: String,
      default: '56px',
    },
    backgroundColor: {
      type: String,
      default: '#B1C909',
    },
    borderRadius: {
      type: String,
      default: '32px',
    },
    onClick: Function,
  },
  setup(props) {
    const buttonStyle = computed(() => ({
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor,
      borderRadius: props.borderRadius,
      padding: '0 24px',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
    }));
  
    const handleClick = (event: Event) => {
      if (props.onClick) {
        props.onClick(event);
      }
    };
  
    return { buttonStyle, handleClick };
  },
});
</script>
  
  <style scoped>
  button:hover {
    opacity: 0.8;
  }
  </style>
  