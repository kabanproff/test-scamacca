<script lang="ts" setup>
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{ modelValue: boolean }>();
const emits = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const burgerButton = ref<HTMLElement | null>(null);
const menuContainer = ref<HTMLElement | null>(null);

function toggleMenu() {
  emits("update:modelValue", !props.modelValue);
}

function closeMenu() {
  if (props.modelValue) emits("update:modelValue", false);
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (
    props.modelValue &&
    burgerButton.value &&
    menuContainer.value &&
    !burgerButton.value.contains(target) &&
    !menuContainer.value.contains(target)
  ) {
    closeMenu();
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <div class="burger">
    <button
      ref="burgerButton"
      class="burger__button"
      :class="{ 'burger--active': modelValue }"
      @click="toggleMenu"
      type="button"
    >
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </button>

    <div
      v-show="modelValue"
      ref="menuContainer"
      id="burger-menu-content"
      class="burger__content"
      role="menu"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.burger {
  position: relative;
  display: inline-block;
  color: var(--text-dark-primary);

  &__button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 44px;
    height: 44px;
    background-color: var(--accent-secondary-default);
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    border-radius: 8px;
  }

  &__line {
    width: 20px;
    height: 2px;
    background-color: var(--bg-dark-dark);
    border-radius: 2px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

  }

  &__content {
    position: absolute;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    top: calc(100% + var(--header-padding));
    left: calc(0px - var(--container-padding));
    background: #fff;
    min-width: 160px;
    width: 100vw;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 4px 4px;
    padding: 0.5rem 0;
    z-index: 1000;
  }

  &--active .burger__line {
    width: 13px;
    transform-origin: -2px;
    left: 2px;

    &:nth-child(1) {
      transform: rotate(45deg);
    }

    &:nth-child(2) {
      opacity: 0;
      transform: translateX(20px);
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
