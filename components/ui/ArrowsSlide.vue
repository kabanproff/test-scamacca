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

const emit = defineEmits(["prev", "next"]);

const classes = computed(() => [
  `arrows-slide--${props.variant}`,
  props.className,
]);
</script>

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

<style lang="scss">
.arrows-slide {
  --border-color: var(--stroke-light-25);
  --color-arrow: var(--text-light-primary);
  --tr-width: 4px;
  --tr-width-hover: 7px;

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

  @media (min-width: 1920px) {
    --tr-width: 11px;
    --tr-width-hover: 3px;
    width: 120px;
    height: 60px;
  }

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
    position: relative;

    svg {
      position: relative;
      transition: var(--all-transition);
    }

    &.prev svg {
      left: var(--tr-width);
    }

    &.next svg {
      left: calc(var(--tr-width) * -1);
    }

    &:hover {
      svg {
        transform: translateX(var(--tr-width));
      }

      &.prev svg {
        --tr-width: calc(var(--tr-width-hover) * -1);;
      }

      &.next svg {
        --tr-width: var(--tr-width-hover);
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
