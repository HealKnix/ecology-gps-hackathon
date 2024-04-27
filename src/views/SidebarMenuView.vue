<template>
  <div class="sidebar">
    <FromToForm style="margin-bottom: 20px" />
    <BaseButton text="Построить маршрут" />
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue';
  import FromToForm from '@/components/FromToForm.vue';
</script>

<style scoped>
  .sidebar {
    width: 500px;
    height: 100%;
    padding: 16px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.15);
    clip: rect(0, 0, 0, 100px);
  }
</style>
