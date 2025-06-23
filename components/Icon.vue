<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :href="`#${name}`" />
  </svg>
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
  color: inherit;
}
</style>
