<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String as PropType<
      "primary-black" | "primary-light" | "secondary-light" | "secondary-black"
    >,
    default: "primary-black",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  className: {
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, boolean>
    >,
    default: "",
  },
  href: {
    type: String,
  },
});

const activeHover = ref(false);

const classes = computed(() => [
  "btn",
  `btn-m`,
  `btn--${props.variant}`,
  { "btn--disabled": props.disabled },
  props.className,
]);

const toggleHover = () => {
  if (!props.disabled) {
    activeHover.value = !activeHover.value;
  }
};
</script>

<template>
  <button
    v-if="!props.href"
    :class="classes"
    :disabled="disabled"
    :type="type"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <slot></slot>
    <Icon
      v-if="activeHover"
      name="fi-rr-arrow-right"
      size="16"
      class="btn-icon"
    />
    <Icon
      v-if="!activeHover"
      name="fi-rr-arrow-up-right"
      size="16"
      class="btn-icon"
    />
  </button>
  <NuxtLink
    v-else
    :class="classes"
    :to="href"
    :disabled="disabled"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <slot></slot>
    <Icon
      v-if="activeHover"
      name="fi-rr-arrow-right"
      size="16"
      class="btn-icon"
    />
    <Icon
      v-if="!activeHover"
      name="fi-rr-arrow-up-right"
      size="16"
      class="btn-icon"
    />
  </NuxtLink>
</template>

<style lang="scss">
:root {
  --btn-bg-color: var(--bg-dark-dark);
  --btn-border-color: transparent;
  --btn-text-color: var(--text-light-primary);
}

.btn {
  position: relative;
  padding: 2px 46px 20px 14px;
  border-radius: 8px;
  border: 1px solid var(--btn-border-color);
  background-color: var(--btn-bg-color);
  color: var(--btn-text-color);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  transition: var(--all-transition);
  user-select: none;

  &.btn--disabled {
    --btn-bg-color: var(--ss-disable-dark-10);
    --btn-text-color: --ss-disable-dark-20
    cursor: not-allowed;
  }

  &.active {
    --btn-text-color: var(--text-light-primary);
    --btn-border-color: var(--accent-primary-hover);
    --btn-bg-color: var(--accent-primary-hover);
  }

  .btn-icon {
    position: absolute;
    right: 13px;
    bottom: 9px;
    color: inherit;

    @media (min-width: 1920px) {
      right: 14px;
      bottom: 13px;
    }
  }

  @media (min-width: 1920px) {
    padding: 3px 60px 27px 14px;
  }
}

/* Primary Black */
.btn--primary-black {

  &:hover:not(.btn--disabled),
  &.active:not(.btn--disabled),
  &:active:not(.btn--disabled) {
    --btn-text-color: var(--text-light-primary);
    --btn-border-color: var(--accent-primary-hover);
    --btn-bg-color: var(--accent-primary-hover);
  }

  &.btn--disabled {
    --btn-text-color: var(--ss-disable-dark-20);
    --btn-border-color: transparent;
  }
}

/* Primary Light */
.btn--primary-light {
  --btn-bg-color: var(--bg-light-light);
  --btn-text-color: var(--text-dark-primary);

  &:hover:not(.btn--disabled),
  &.active:not(.btn--disabled),
  &:active:not(.btn--disabled) {
    --btn-text-color: var(--text-dark-primary);
    --btn-border-color: var(--accent-primary-hover);
    --btn-bg-color: var(--accent-primary-hover);
  }
  &.btn--disabled {
    --btn-text-color: var(--ss-disable-light-20);
    --btn-border-color: transparent;
    --btn-bg-color: var(--ss-disable-light-10);
  }
}

/* Secondary Light */
.btn--secondary-light {
  --btn-text-color: var(--text-light-primary);
  --btn-border-color: var(--stroke-light-25);
  --btn-bg-color: transparent;

  &:hover:not(.btn--disabled),
  &.active:not(.btn--disabled),
  &:active:not(.btn--disabled) {
    --btn-bg-color: var(--bg-light-light);
    --btn-text-color: var(--text-dark-primary);
    --btn-bg-color: var(--bg-light-light);
  }

  &.btn--disabled {
    --btn-text-color: var(--ss-disable-light-20);
    --btn-border-color: transparent;
    --btn-bg-color: var(--ss-disable-light-10);
  }
}

/* Secondary Black */
.btn--secondary-black {
  --btn-bg-color: var(--bg-light-light);
  --btn-text-color: var(--text-dark-primary);
  --btn-bg-color: var(--bg-light-light);

  &:hover:not(.btn--disabled),
  &.active:not(.btn--disabled),
  &:active:not(.btn--disabled) {
    --btn-bg-color: var(--bg-dark-dark);
    --btn-border-color: transparent;
    --btn-text-color: var(--text-light-primary);
  }

  &.btn--disabled {
    --btn-text-color: var(--ss-disable-dark-20);
    --btn-border-color: transparent;
    --btn-bg-color: var(--ss-disable-dark-10);
  }
}
</style>
