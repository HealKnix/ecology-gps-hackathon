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
        <input class="to_input" type="text" placeholder="Пункт назначения" />
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
    grid-template-columns: 32px 1fr 50px;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 7px 20px 0 rgba(105, 121, 248, 0.22);
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
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgb(210, 215, 217)' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    width: 1px;
    height: 15px;
    transform: translateY(-50%);
    margin: auto;
  }

  .from_to_form > .column_2 > input {
    outline: none;
    width: 100%;
    font-size: 18px;
    padding: 15px;
    border: none;
    text-overflow: ellipsis;
  }

  .from_to_form > .column_2 > input:focus {
    color: var(--accent-color-2);
  }

  .from_to_form > .column_2 > input:focus::placeholder {
    color: var(--accent-color-2);
  }

  .form_to_divider {
    display: flex;
    align-items: center;
  }

  .input_divider {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgb(210, 215, 217)' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='15' stroke-linecap='square'/%3e%3c/svg%3e");
    height: 1px;
    margin: 0 15px;
  }

  .column_3 {
    display: grid;
    justify-content: baseline;
    align-items: center;
  }

  .replace_btn {
    --color: var(--accent-color-2);

    cursor: pointer;
    border: none;
    width: 42px;
    height: 42px;
    padding: 12px;
    background-color: var(--color);
    border-radius: 50%;
    transition: 0.15s ease-in-out;
  }

  .replace_btn:hover {
    background-color: color-mix(in srgb, var(--color), black 10%);
  }

  .replace_btn:focus {
    outline: 2px solid var(--color);
    outline-offset: 2px;
    outline-width: 2.5px;
  }

  .replace_btn:active {
    scale: 0.98;
  }
</style>
