<template>
  <div
    class="arrows-slide"
    :class="classes"
  >
    <button
      class="arrows-slide__arrow prev"
      @click="$emit('prev')"
      type="button"
    >
      <Icon
        name="fi-rr-angle-small-left"
        size="20"
      />
    </button>
    <button
      class="arrows-slide__arrow next"
      @click="$emit('next')"
      type="button"
    >
      <Icon
        name="fi-rr-angle-small-right"
        size="20"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String as PropType<"light" | "black">,
    default: "light",
  },
  className: {
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, boolean>
    >,
    default: "",
  },
});

const classes = computed(() => [
  `arrows-slide--${props.variant}`,
  props.className,
]);
</script>

<style lang="scss">
.arrows-slide {
  --border-color: var(--stroke-light-25);
  --color-arrow: var(--text-light-primary);

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 8px;
  user-select: none;
  width: 90px;
  height: 50px;
  border: 1px solid var(--border-color);
  position: relative;

  &--black {
    --border-color: var(--stroke-dark-25);
    --color-arrow: var(--text-dark-primary);
  }

  &__arrow {
    background: transparent;
    display: block;
    border: none;
    color: var(--color-arrow);
    cursor: pointer;
    user-select: none;
    line-height: 1;
    padding: 0;
    flex-grow: 1;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    transition: var(--all-transition);
    position: relative;
    left: 4px;

    &.next {
      left: -4px;
    }

    &:hover {
      transform: translateX(var(--tr-width));

      &.prev {
        --tr-width: -7px;
      }

      &.next {
        --tr-width: 7px;
      }
    }
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    width: 1px;
    height: 10px;
    background-color: var(--border-color);
  }

  &::after {
    bottom: 0;
  }
  &::before {
    top: 0;
  }
}
</style>
