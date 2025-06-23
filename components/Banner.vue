<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Carousel } from "@fancyapps/ui";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.js";
import "@fancyapps/ui/dist/carousel/carousel.css";
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";
import Button from "./ui/Button.vue";

import slide1 from "@/assets/images/slides/slide1.webp";

const slides = [
  { image: slide1, alt: "Слайд 1" },
  { image: slide1, alt: "Слайд 2" },
  { image: slide1, alt: "Слайд 3" },
];

const carouselRef = ref<HTMLElement | null>(null);
let carouselInstance: ReturnType<typeof Carousel> | null = null;

onMounted(() => {
  // console.log("mounted", carouselRef.value);
  if (carouselRef.value) {
    carouselInstance = Carousel(
      carouselRef.value,
      {
        slidesPerPage: 1,
        Autoplay: {
          timeout: 4000,
        },
      },
      { Autoplay }
    ).init();
  }
});

onBeforeUnmount(() => {
  if (carouselInstance) {
    carouselInstance.destroy();
    carouselInstance = null;
  }
});
</script>

<template>
  <div class="banner">
    <div
      ref="carouselRef"
      class="banner__carousel f-carousel"
    >
      <div
        class="banner__slide f-carousel__slide"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="banner__img"
        />
      </div>
    </div>
    <div class="banner__container container">
      <div class="banner__descr">
        <h1>
          Любимый семейный<br />
          кроссовер уже в продаже!
        </h1>
        <p>
          Первый взнос составит 12% от стоимости дома, без изменения за
          использование кредита.
        </p>
        <div class="banner__bts">
          <Button variant="secondary-light"> Подробнее </Button>
          <Button variant="primary-light">Тест-драйв</Button>
        </div>
        <div class="banner__form"></div>
      </div>
      <SlideNav :count-bars="slides.length" />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --f-carousel-slide-height: 100vh;
}

.banner {
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  position: relative;
  color: var(--text-light-primary);

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
  }

  //del
  &__slide {

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &[index="1"] img {
      transform: rotateY(180deg);
    }
  }

  &__descr {
    width: 55%;
  }
  &__form {
    width: 45%;
  }

  &__bts {
    .btn {
      margin-right: 20px;
    }
  }
}
</style>
