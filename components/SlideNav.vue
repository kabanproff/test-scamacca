<script setup lang="ts">
import ArrowsSlide from "./ui/ArrowsSlide.vue";

// const props = defineProps<{ countBars: number; className: string }>();
const props = defineProps({
  countBars: Number,
  barref: ref<HTMLElement | null>(null),
  className: [String, Array, Object],
});

const emit = defineEmits(["prev", "next"]);
</script>

<template>
  <div
    class="sl-nav"
    :class="className"
  >
    <div
      v-if="countBars"
      class="sl-nav__bars"
    >
      <div
        class="sl-nav__bar"
        v-for="bar in countBars"
        :key="bar - 1"
        :ref="(el) =>(barref[bar - 1] = el)"
      >
      </div>
    </div>

    <div class="sl-nav__btns">
      <ArrowsSlide
        variant="light"
        @prev="$emit('prev')"
        @next="$emit('next')"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sl-nav {
  --f-progressbar-color: var(--stroke-light-100);

  display: flex;
  align-items: flex-end;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 58px;
  }

  &__bars {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    gap: 10px;

    @media (min-width: 768px) {
      gap: 20px;
    }
    @media (min-width: 1440px) {
      gap: 40px;
    }
  }

  &__bar {
    height: 2px;
    background-color: var(--stroke-light-25);
    width: 100%;
    position: relative;
  }
}
</style>
