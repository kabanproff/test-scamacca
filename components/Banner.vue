<script setup lang="ts">
import { Carousel } from "@fancyapps/ui";
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.js";
import "@fancyapps/ui/dist/carousel/carousel.css";
import { onBeforeUnmount, onMounted, ref } from "vue";

import slide1 from "@/assets/images/slides/photo1.jpg";

const slides = [
  { image: slide1, alt: "Слайд 1" },
  { image: slide1, alt: "Слайд 2" },
  { image: slide1, alt: "Слайд 3" },
];

const carouselRef = ref<HTMLElement | null>(null);
let carouselInstance: ReturnType<typeof Carousel> | null = null;

const currentSlide = ref({ index: 0 });
const progressbarRefs = ref<HTMLElement[]>([]);
const store = useScreenStore();

onMounted(async () => {
  await nextTick();
  if (carouselRef.value) {
    carouselInstance = Carousel(
      carouselRef.value,
      {
        slidesPerPage: 1,

        Autoplay: {
          timeout: 994000,
          progressbarParentEl: () => {
            return progressbarRefs.value[currentSlide.value.index] || null;
          },
        },
      },
      { Autoplay }
    ).init();

    currentSlide.value = carouselInstance.getPage();
    carouselInstance.on("change", (event) => {
      currentSlide.value = event.getPage();
    });

    carouselRef.value?.classList.add("js-carousel-initialized");
  }
});

onBeforeUnmount(() => {
  if (carouselInstance) {
    carouselInstance.destroy();
    carouselInstance = null;
  }
});

function prevSlide() {
  carouselInstance?.prev();
}

function nextSlide() {
  carouselInstance?.next();
}
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
        :key="slide.alt + index"
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
        <h1 class="banner__title">
          Любимый семейный<br />
          кроссовер уже в продаже!
        </h1>
        <p class="banner__text">
          Первый взнос составит 12% от стоимости дома,&nbsp; без изменения за
          использование кредита.
        </p>
        <div class="banner__bts">
          <UiButton variant="secondary-light"> Подробнее </UiButton>
          <UiButton variant="primary-light">Тест-драйв</UiButton>
        </div>
      </div>

      <FormBanner
        v-if="store.isDesktop"
        className="banner__form"
      />

      <SlideNav
        className="banner__nav"
        :count-bars="slides.length"
        :barref="progressbarRefs"
        @prev="prevSlide"
        @next="nextSlide"
      >
      </SlideNav>
    </div>
  </div>
  <div
    v-if="!store.isDesktop"
    class="container"
  >
    <FormBanner className="banner__form" />
  </div>
</template>

<style lang="scss">

.banner {
  --p-top: 30px;
  --f-carousel-slide-height: calc(100vh - var(--header-height) - var(--p-top));

  min-height: calc(100vh - var(--header-height));
  position: relative;
  color: var(--text-light-primary);
  margin-bottom: -30px;
  padding-bottom: 30px;

  @media (min-width: 768px) {
    --p-top: 60px;
  }

  @media (min-width: 1440px) {
    --p-top: 100px;
  }

  @media (min-width: 1920px) {
    --p-top: 120px;
  }

  &__carousel {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: var(--bg-light-white);
    top: 0;
    left: 0;
  }

  &__container {
    display: grid;
    padding-top: var(--p-top);
    position: relative;

    @media (min-height: 567px) and (max-width: 767.98px) {
      grid-auto-rows: 60vh 16.4vh;
    }

    @media (min-height: 604px) and (min-width: 768px) {
      grid-auto-rows: 50vh 22.7vh;
    }

    @media (min-width: 1440px) {
      grid-template-columns: 71.9% 28.1%;
      grid-auto-rows: auto;
    }

    @media (min-width: 1920px) {
      grid-template-columns: 75.9% 24.1%;
    }
  }

  &__slide {
    display: none;
    height: 100%;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0a0a0a;
      opacity: 0.5;
    }

    &:first-child {
      display: block;
    }

    .js-carousel-initialized & {
      display: block;
    }

    img {
      width: 100%;
      height: 100%;
      transform: translateX(-50%);
      max-width: none;
      position: relative;
      left: 50%;
      object-fit: cover;
    }

    &[index="1"] img {
      transform: translateX(-50%) rotateY(180deg);
    }
  }

  &__descr {
    max-width: 310px;
    @media (min-width: 768px) {
      max-width: 390px;
    }

    @media (min-width: 1440px) {
      max-width: 100%;
    }
  }

  &__text {
    @media (min-width: 1440px) {
      max-width: 50%;
    }
    @media (min-width: 1920px) {
      max-width: 40%;
    }
  }

  &__title {
    margin-top: 0;
  }

  &__form {
    order: 1;
    position: relative;

    @media (min-width: 992px) {
      order: 0;
      top: 0;
    }
  }

  &__bts {
    margin-bottom: 28px;

    @media (min-width: 768px) {
      margin-bottom: 51px;
    }

    .btn {
      margin-right: 20px;
      margin-bottom: 12px;

      @media (min-width: 768px) {
        margin-right: 10px;
      }
    }
  }

  &__nav {
    margin-bottom: 40px;

    @media (min-width: 768px) {
      margin-bottom: 50px;
    }

    @media (min-width: 1440px) {
      grid-column: 1/3;
      grid-row: 2/3;
      margin-bottom: 0;
      margin-top: 51px;
    }

    @media (min-width: 1440px) {
      margin-top: 61px;
    }
  }

  .container {
    position: relative;
  }
}
</style>
