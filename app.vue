<script setup lang="ts">
import sprite from "~/assets/sprite.svg?raw";
import { useBrowserClass } from '~/composables/useBrowserClass'

useBrowserClass();
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
    <div v-html="sprite"></div>
  </NuxtLayout>
</template>
