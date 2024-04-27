<script setup lang="ts">
  import SidebarMenuView from '@/views/SidebarMenuView.vue';
  import ContentView from '@/views/ContentView.vue';
  import Map from './components/Map.vue';
</script>

<template>
  <div class="wrapper_app">
    <SidebarMenuView />
    <div class="wrapper_column">
      <Map />
      <ContentView />
    </div>
  </div>
</template>

<style scoped>
  .wrapper_app {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .wrapper_column {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
