<template>
  <div class="form__wrapper">
    <!-- <span class="form_title"> {{ title }} </span> -->
    <div class="radio_form">
      <label
        v-for="(item, index) in items"
        :key="item.id"
        :for="`radio_input_${name}_${index}`"
        class="input__wrapper"
      >
        <span class="radio_btn_text">
          {{ item.name }}
        </span>
        <hr />
        <span class="radio_btn_description"> {{ item.description }} </span>
        <input
          type="radio"
          :name="name"
          :id="`radio_input_${name}_${index}`"
          :checked="item.id === currentItemId"
          :value="item.id"
          @input="$emit('update:modelValue', item.id)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      require: false,
      default: '',
      type: String,
    },
    name: {
      require: true,
      default: '',
      type: String,
    },
    items: {
      require: true,
      default: new Object(),
      type: Object,
    },
    currentItemId: {
      require: false,
      default: 0,
      type: Number,
    },
  });
</script>

<style scoped>
  hr {
    margin: 10px 0;
    background-color: var(--accent-color-2);
    transition: 0.15s ease-in-out;
  }

  .form__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /* .form_title {
    font-size: 222px;
    font-weight: 500;
  } */

  .radio_form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 35px;
    text-align: center;
    border-radius: 7px;
    font-size: 20px;
  }

  .radio_btn_text {
    font-family: MontserratA Medium;
  }

  .radio_btn_description {
    font-size: 16px;
  }

  input {
    width: 0;
    opacity: 0;
  }

  /* .radio_form:has(label > input[type='radio']:active) {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-color-2);
  }

  .radio_form:has(label > input[type='radio']:focus) {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent-color-2);
  }

  .form_title:has(+ .radio_form > label > input[type='radio']:active) {
    color: var(--accent-color-2);
  }

  .form_title:has(+ .radio_form > label > input[type='radio']:focus) {
    color: var(--accent-color-2);
  } */

  .input__wrapper {
    width: 300px;
    flex-direction: column;
    cursor: pointer;
    font-weight: 500;
    padding: 15px 25px;
    border-radius: var(--br-big);
    border: 1px solid #e7e7e7;
    background-color: white;
    transition: 0.15s ease-in-out;
  }

  .input__wrapper:active {
    scale: 0.98;
  }

  .input__wrapper:active > hr {
    border: 1px solid var(--accent-color-2);
  }

  .input__wrapper:hover {
    background-color: #6778f80d;
  }

  /* .input__wrapper:first-child {
    border-radius: 6px 6px 0 0;
  }

  .input__wrapper:last-child {
    border-radius: 0 0 6px 6px;
  } */

  .input__wrapper:has(input[type='radio']:checked) {
    background-color: color-mix(
      in srgb,
      var(--accent-color-2) 15%,
      transparent 100%
    );
    box-shadow: 0 0 0 3px var(--accent-color-2);
  }
  .input__wrapper:has(input[type='radio']:checked) > span {
    color: var(--accent-color-2);
  }
  .input__wrapper:has(input[type='radio']:checked) > hr {
    border: 1px solid var(--accent-color-2);
  }
</style>
