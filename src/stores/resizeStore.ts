import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useResizeStore = defineStore('resize', () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  window.addEventListener('resize', () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  });

  return { width, height };
});
