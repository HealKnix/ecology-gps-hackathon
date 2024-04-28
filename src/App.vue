<script setup lang="ts">
  import SidebarMenuView from '@/views/SidebarMenuView.vue';
  import ContentView from '@/views/ContentView.vue';
  import MapView from './views/MapView.vue';
</script>

<template>
  <div class="wrapper_app">
    <SidebarMenuView class="sidebar" />
    <div class="wrapper_column">
      <MapView />
      <ContentView />
    </div>
  </div>
</template>

<style scoped>
  .wrapper_app {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .wrapper_column {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  @media (width <= 1405px) {
    .wrapper_column {
      display: block;
    }
  }

  @media (width <= 1000px) {
    .sidebar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
    }
  }
</style>
