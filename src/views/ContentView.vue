<template>
  <div class="content">
    <div class="ecology_cards">
      <BaseRadioForm
        title="Экологические карточки"
        name="ecoCards"
        :items="ecologyCards"
        :current-item-id="currentEcologyCardId"
        v-model="currentEcologyCardId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseRadioForm from '@/components/BaseRadioForm.vue';
  import { ref } from 'vue';

  const currentEcologyCardId = ref(0);

  const ecologyCards = [
    {
      id: 0,
      name: 'Экологичный',
      description: 'минимизирует выбросы углекислого газа',
    },
    {
      id: 1,
      name: 'Сбалансированный',
      description:
        'учитывает комфорт и время в пути без ущерба для окружающей среды',
    },
    {
      id: 2,
      name: 'Не самый экологичный',
      description:
        'предпочтение скорости и удобства без учета экологических аспектов',
    },
  ];
</script>

<style scoped>
  .content {
    padding: 15px;
  }

  .ecology_cards {
    padding: 50px 0;
  }
</style>
