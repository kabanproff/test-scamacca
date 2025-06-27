<script lang="ts" setup>
import { computed, ref } from "vue";
// import { useScreen } from "~/composables/useScreenStoreStore";

interface Props {
  id: string;
  type?: string;
  modelValue: string | boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  placeholder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string | boolean): void;
}>();

const isFocused = ref(false);
const isHovered = ref(false);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    if (props.type === "checkbox") {
      emit("update:modelValue", target.checked);
    } else {
      emit("update:modelValue", target.value);
    }
  }
};

const onFocus = () => {
  if (!props.disabled) {
    isFocused.value = true;
  }
};
const onBlur = () => {
  isFocused.value = false;
};
const onMouseEnter = () => {
  if (!props.disabled) {
    isHovered.value = true;
  }
};
const onMouseLeave = () => {
  isHovered.value = false;
};

const store = useScreenStore();

const screenClass = computed(() => {
  return store.screen === "xxl" ? "body-s-regular" : "body-m-regular";
});
</script>

<template>
  <div
    class="inp"
    :class="{
      'inp--disabled': disabled,
      'inp--error': error,
      'inp--focused': isFocused,
      'inp--hovered': isHovered && !disabled,
    }"
  >
    <label
      v-if="label && type !== 'checkbox'"
      class="inp__label"
      :for="id"
      >{{ label }}</label
    >

    <label
      v-if="type === 'checkbox'"
      class="inp__checkbox-label"
      :class="screenClass"
      :for="id"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focusin="onFocus"
      @focusout="onBlur"
    >
      <input
        :id="id"
        class="inp__control"
        type="checkbox"
        :disabled="disabled"
        v-model="props.modelValue"
        @change="onInput"
      />
      <span class="inp__custom-checkbox">
        <Icon
          name="fi-rr-check-2"
          size="10"
        />
      </span>
      <span class="inp__checkbox-text">
        <slot name="checkbox-label"></slot>
      </span>
    </label>

    <input
      v-if="type !== 'checkbox'"
      :id="id"
      class="inp__control"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      :type="type"
      :autocomplete="type"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    />

    <div
      v-if="$slots.error"
      class="inp__error error-field"
    >
      <Icon
        name="fi-rr-info"
        size="14"
      />
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.inp {
  --inp-color: var(--text-dark-primary);
  --inp-font-size: inherit;
  --inp-border-color: var(--stroke-dark-25);
  --inp-bg-color: var(--bg-light-white);
  --imp-text-placeholder-color: var(--text-dark-secondary);
  --inp-margin-bottom: 16px;
  --inp-label-margin-bottom: 5px;
  --inp__checkbox-text-fz: var(--font-size-body-m-regular);
  --inp-font-size-label: var(--font-size-caption-s-semibold-1440);


  --inp-padding-top: 14px;
  --inp-padding-right: 14px;
  --inp-padding-bottom: 13px;
  --inp-padding-left: 14px;

  display: flex;
  flex-direction: column;
  color: var(--inp-color);
  margin-bottom: var(--inp-margin-bottom);

  @media (min-width: 1920px) {
    --inp-padding-top: 18px;
    --inp-padding-right: 20px;
    --inp-padding-bottom: 16px;
    --inp-padding-left: 20px;


  }

  &__label {
    user-select: none;
    color: var(--inp-color);
    text-transform: uppercase;
    margin-bottom: var(--inp-label-margin-bottom);
    font-size: var(--inp-font-size-label);

    @media (min-width: 1920) {
      --inp-font-size-label: var(--font-size-caption-s-semibold-1920);
    }
  }

  &__control {
    padding: var(--inp-padding-top) var(--inp-padding-right)
      var(--inp-padding-bottom) var(--inp-padding-left);
    border: 1px solid var(--inp-border-color);
    color: var(--inp-color);
    border-radius: 8px;
    outline: none;
    transition: var(--all-transition);
    background-color: var(--inp-bg-color);
    font-size: var(--inp-font-size);

    &:hover {
      --inp-bg-color: var(--bg-dark-10);
    }

    &:active {
      --inp-border-color: var(--stroke-dark-50);
    }

    &:disabled {
      --inp-border-color: var(--ss-disable-dark-20);
      --inp-color: var(--ss-disable-dark-20);
      cursor: not-allowed;

      &::placeholder {
        color: var(--ss-disable-dark-20);
      }
    }

    &::placeholder {
      color: var(--imp-text-placeholder-color);
    }
  }

  &__error {
    margin-top: 2px;
    user-select: none;
    position: relative;
    padding: 8px 8px 10px 38px;
    border: 1px solid var(--stroke-dark-10);
    border-radius: 8px;
    color: var(--text-dark-secondary);
    // width: 154%; //typograph
    letter-spacing: -0.5px;

    @media (min-width: 1920px) {
      margin-top: 5px;
    }

    svg {
      position: absolute;
      color: var(--system-error);
      left: 14px;
      top: 9px;
    }
  }

  [type="checkbox"] {
    display: none;
  }

  &__checkbox-label {
    display: flex;
    gap: 12px;
    cursor: pointer;
    user-select: none;

    @media (min-width: 1920px) {
      gap: 15px;
    }
  }

  &__checkbox-text {
    font-size: var(--inp__checkbox-text-fz);
  }

  &__custom-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: var(--text-light-primary);
    border-radius: 4px;
    position: relative;
    flex-shrink: 0;
    background-color: var(--bg-dark-dark);

    @media (min-width: 1920px) {
      width: 24px;
      height: 24px;
    }

    svg {
      display: none;
    }
  }

  &__control:checked + &__custom-checkbox svg {
    display: block;
  }

  &--disabled {
    --inp-color: var(--ss-disable-dark-20);

    & .inp__control {
      cursor: not-allowed;
    }
  }

  &--error {
    --inp-border-color: var(--stroke-dark-50);
  }
}
</style>
