<template>
  <div class="sidebar">
    <FromToForm style="margin-bottom: 20px" />
    <BaseButton text="Построить маршрут" />
    <button
      class="show_sidebar_btn"
      :class="[{ show: show }, { close: !show }]"
      @click="
        () => {
          show = !show;
        }
      "
    >
      <img :src="AngleSVG" width="20" class="angle" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue';
  import FromToForm from '@/components/FromToForm.vue';
  import AngleSVG from '@/assets/angle.svg';
  import { ref } from 'vue';

  const show = ref(true);
</script>

<style scoped>
  .sidebar {
    position: relative;
    width: 550px;
    height: 100%;
    padding: 20px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.15);
    clip: rect(0, 0, 0, 100px);
    transition: 0.25s ease-in-out;
  }

  .sidebar:has(.show_sidebar_btn.close) {
    width: 0;
    padding: 0;
  }

  .show_sidebar_btn {
    --color: var(--accent-color-2);

    outline: none;
    cursor: pointer;
    border: none;
    position: absolute;
    left: 100%;
    top: 50%;
    width: 50px;
    height: 70px;
    border-radius: var(--br-small);
    background-color: var(--color);
    transform: translate(10px, -50%);
    transition: 0.25s ease-in-out;
    z-index: 9999;
  }

  .show_sidebar_btn > .angle {
    transition: 0.25s ease-in-out;
  }

  .show_sidebar_btn:hover {
    background-color: color-mix(in srgb, var(--color), black 10%);
  }

  .show_sidebar_btn:focus {
    outline: 2px solid var(--color);
    outline-offset: 2px;
    outline-width: 2.5px;
  }

  .show_sidebar_btn:active {
    scale: 0.98;
  }

  .show_sidebar_btn.show > .angle {
    transform: rotate(0);
  }

  .show_sidebar_btn.close > .angle {
    transform: rotate(180deg);
  }
</style>
