<template>
  <div class="content">
    <div class="ecology_cards">
      <FromToForm
        v-if="show"
        v-show="show"
        style="max-width: 450px; margin: 0 auto"
      />
      <BaseRadioForm
        title="Экологические карточки"
        name="ecoCards"
        :items="ecologyCards"
        :current-item-id="currentEcologyCardId"
        v-model="currentEcologyCardId"
        :style="{ marginTop: show ? '50px' : 0 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseRadioForm from '@/components/BaseRadioForm.vue';
  import { useResizeStore } from '@/stores/resizeStore';
  import { ref, watchEffect } from 'vue';
  import FromToForm from '@/components/FromToForm.vue';

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

  const resizeStore = useResizeStore();
  const show = ref(false);

  watchEffect(() => {
    if (resizeStore.width < 1000) {
      show.value = true;
    } else {
      show.value = false;
    }
  });
</script>

<style scoped>
  .content {
    position: relative;
    padding: 15px;
  }

  .ecology_cards {
    padding: 20px 0;
  }

  @media (width <= 500px) {
    .content::before {
      display: block;
      content: '';
      position: absolute;
      width: 100px;
      height: 5px;
      border-radius: 1000px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background-color: #ddd;
    }
  }
</style>
