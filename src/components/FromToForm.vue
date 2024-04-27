<template>
  <div class="from_to__wrapper">
    <div class="from_to_form">
      <div class="column_1">
        <img :src="Navigation" width="28" />
        <div class="icon_divider"></div>
        <img :src="Location" width="28" />
      </div>
      <div class="column_2">
        <input class="from_input" type="text" placeholder="Ваша локация" />
        <div class="input_divider"></div>
        <input
          class="to_input"
          type="text"
          placeholder="Введите пункт назначения"
        />
      </div>
      <div class="column_3">
        <button class="replace_btn">
          <img :src="ReplaceSVG" width="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Navigation from '@/assets/Navigation.svg';
  import Location from '@/assets/Location.svg';
  import ReplaceSVG from '@/assets/Combined Shape.svg';
</script>

<style scoped>
  .from_to_form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 7px 0 20px 0 rgba(0, 0, 0, 0.07);
    padding: 5px 15px;
    border-radius: var(--br-small);
  }

  .from_to_form > .column_1 {
    display: grid;
    grid-template-rows: 1fr 1px 1fr;
    justify-content: center;
    align-items: center;
  }

  .icon_divider {
    width: 1px;
    height: 15px;
    border: 1px dashed #ecebed;
    transform: translateY(-50%);
    margin: auto;
  }

  .from_to_form > .column_2 > input {
    outline: none;
    width: 100;
    font-size: 20px;
    padding: 15px;
    border: none;
  }

  .from_to_form > .column_2 > .from_input {
    color: var(--accent-color-2);
  }

  .from_to_form > .column_2 > .from_input::placeholder {
    color: var(--accent-color-2);
  }

  .form_to_divider {
    display: flex;
    align-items: center;
  }

  .input_divider {
    height: 1px;
    border: 1px dashed #ecebed;
    margin: 0 15px;
  }

  .column_3 {
    display: grid;
    justify-content: baseline;
    align-items: center;
  }

  .replace_btn {
    cursor: pointer;
    width: 42px;
    height: 42px;
    border: none;
    padding: 8px;
    background-color: var(--accent-color-2);
    border-radius: 50%;
  }
</style>
