<script setup lang="ts">


const props = defineProps<{ countBars: number }>();
</script>

<template>
  <div class="sl-nav">
    <div v-if="countBars" class="sl-nav__bars">
      <div class="sl-nav__bar" v-for="bar in countBars" :key="bar">
        <div class="f-progressbar"></div>
      </div>
    </div>

    <div class="sl-nav__btns">
      <button class="sl-nav__btn btn-prev"></button>
      <button class="sl-nav__btn btn-next"></button>
    </div>
  </div>
</template>

<style lang="scss">
.sl-nav {
  --f-progressbar-color: var(--stroke-light-100);
  
  &__bars {
    display: flex;
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
  }
}
</style>
