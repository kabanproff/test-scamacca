<template>
  <NuxtLayout>
      <NuxtPage />
      <div v-html="sprite"></div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import sprite from '~/assets/sprite.svg?raw'
</script>
