<script setup lang="ts">
import { useId } from "vue";
// import UiInput from '~/components/UiInput.vue';

const inputs = [
  {
    label: "Default",
    placeholder: "Введите ваше имя",
    model: ref(""),
    id: useId(),
  },
  {
    label: "Hover",
    placeholder: "Введите ваше имя",
    model: ref(""),
    id: useId(),
  },
  {
    label: "Active",
    placeholder: "Введите ваше имя",
    model: ref("Анд"),
    id: useId(),
  },
  {
    label: "Disabled",
    placeholder: "Введите ваше имя",
    model: ref(""),
    id: useId(),
    disabled: true,
  },
  {
    label: "Error",
    placeholder: "Введите ваше имя",
    model: ref("Анд"),
    id: useId(),
    error: true,
  },
];
const inputs2 = [
  {
    label: "Телефон",
    type: "tel",
    placeholder: "+7 (___) ___-__-__",
    model: ref(""),
    id: useId(),
  },
  {
    label: "Телефон",
    type: "tel",
    placeholder: "+7 (___) ___-__-__",
    model: ref(""),
    id: useId(),
  },
  {
    label: "Телефон",
    type: "tel",
    placeholder: "+7 (___) ___-__-__",
    model: ref("Анд"),
    id: useId(),
  },
  {
    label: "Телефон",
    type: "tel",
    placeholder: "+7 (___) ___-__-__",
    model: ref(""),
    id: useId(),
    disabled: true,
  },
  {
    label: "Телефон",
    type: "tel",
    placeholder: "+7 (___) ___-__-__",
    model: ref("Анд"),
    id: useId(),
    error: true,
  },
];
</script>

<template>
  <div class="container" style="padding: 20px">
    <UiButton href="/ui">Back</UiButton>
    <div class="row">
      <UiInput
        v-for="input in inputs"
        :key="input.id"
        :id="input.id"
        :label="input.label"
        :modelValue="input.model.value"
        :placeholder="input.placeholder"
        @update:modelValue="(val) => (input.model.value = val as string)"
        :disabled="input.disabled"
        :error="input.error"
      >
        <template v-if="input.label === 'Error'" v-slot:error>
          Подсказка — элемент графического интерфейса, служит дополнительным
          средством обучения пользователя.
        </template>
      </UiInput>
    </div>
    <div class="row">
      <UiInput
        v-for="input in inputs2"
        :key="input.id"
        :id="input.id"
        :label="input.label"
        :modelValue="input.model.value"
        :placeholder="input.placeholder"
        @update:modelValue="(val) => (input.model.value = val as string)"
        :disabled="input.disabled"
        :error="input.error"
      >
        <template v-if="input.label === 'Error'" v-slot:error>
          Подсказка — элемент графического интерфейса, служит дополнительным
          средством обучения пользователя.
        </template>
      </UiInput>
    </div>
  </div>
</template>

<style lang="scss">
.btn {
  margin-bottom: 55px;
}

.row {
  display: flex;
  gap: 26px;
  padding-right: 100px;
  flex-wrap: wrap;
}

.inp {
  width: 245px;
}
</style>
