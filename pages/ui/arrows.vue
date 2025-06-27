<script setup lang="ts">
import { UiArrowsSlide } from "#components";
</script>

<!-- <script>
import Arrows from "@/components/ui/ArrowsSlide.vue";

</script> -->
<template>
  <div
    class="container"
    style="padding: 20px"
  >
    <UiButton href="/ui">Back</UiButton>
    <div class="box">
      <UiArrowsSlide variant="light"/>
      <UiArrowsSlide variant="black"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  background-color: #545454;
  padding: 20px;
}

.btn {
  margin-bottom: 20px;
}
</style>
