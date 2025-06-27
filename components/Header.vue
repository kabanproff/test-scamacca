<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";

import BurgerMenu from "./BurgerMenu.vue";
import NavMenu from "./NavMenu.vue";

interface MenuItem {
  name: string;
  submenu?: MenuItem[];
  link?: string;
}

const menuItems = ref<MenuItem[]>([
  {
    name: "Модельный ряд",
    submenu: [{ name: "Услуга 1" }, { name: "Услуга 2" }],
  },
  { name: "Покупка", submenu: [{ name: "Покупка 1" }, { name: "Покупка 2" }] },
  {
    name: "Сервис",
    link: "/service",
    submenu: [
      { name: "Сервис 1", link: "/service/1" },
      { name: "Сервис 2", link: "/service/2" },
    ],
  },
  { name: "О нас", submenu: [{ name: "О нас 1" }, { name: "О нас 2" }] },
  { name: "Контакты", link: "/contacts", submenu: [] },
  { name: "Блог", link: "/blog", submenu: [] },
  {
    name: "FAQ",
    link: "/faq",
    submenu: [
      { name: "faq", link: "/faq/qoff" },
      { name: "О нас 1", link: "/faq/qon" },
      { name: "О нас 2" },
    ],
  },
]);

const screenStore = useScreenStore();

const burgerMenuOpen = ref(false);
const isHidden = ref(false);

let lastScroll = 0;
function onScroll() {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }
  lastScroll = currentScroll;
}

watchEffect(() => {
  if (typeof window === "undefined" || !screenStore.width) return;
  burgerMenuOpen.value = screenStore.isDesktop;
});

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header
    :class="{ 'header--hidden': isHidden }"
    class="header"
  >
    <div class="container">
      <div class="header__box">
        <!-- Бургер меню только на мобилках -->
        <BurgerMenu
          v-if="!screenStore.isDesktop"
          v-model="burgerMenuOpen"
        >
          <div class="container">
            <span class="header__description logo-description">
              Официальный дилер Scamacca в&nbsp;Москве
            </span>
            <NavMenu
              :menuItems="menuItems"
              :isMobile="!screenStore.isDesktop"
              className="header__nav body-m-regular"
            />
            <address class="header__address body-m-regular">
              г. Москва, ул. Примерная, 1
            </address>
          </div>
        </BurgerMenu>

        <!-- Логотип -->
        <a
          href="/"
          class="header__logo"
        >
          <img
            src="~/assets/images/companyLogo.svg"
            alt="Логотип"
          />
        </a>
        <span class="header__description logo-description">
          Официальный дилер <br />Scamacca в Москве
        </span>

        <!-- Навигация для десктопа -->
        <NavMenu
          v-if="screenStore.isDesktop"
          :menuItems="menuItems"
          :isMobile="!screenStore.isDesktop"
          class="header__nav body-m-regular"
        >
        </NavMenu>

        <!-- Телефон и адрес -->
        <div class="header__contacts">
          <address class="header__address body-m-regular">
            г. Москва, ул. Космонавтиков, д. 6
          </address>
          <a
            href="tel:+74954340326"
            class="header__phone body-m-medium"
          >
            <span>+7 (495) 434-03-26</span>
            <Icon
              name="fi-rr-call-outgoing"
              size="24"
            />
          </a>
        </div>

        <!-- Лайки и сравнение -->
        <div class="header__bar">
          <a href="#" class="header__likes">
            <Icon
              name="fi-rr-heart"
              size="24"
            />
            <span class="header__likes-count header__count">24</span>
          </a>
          <a href="#" class="header__compare body-m-medium">
            <Icon
              name="fi-rr-stats"
              size="24"
            />
            <span class="header__compare-count header__count">12</span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--bg-dark-dark);
  transition: transform 0.3s ease;
  z-index: 1000;
  padding-top: var(--header-padding);
  padding-bottom: var(--header-padding);
  align-items: center;
  color: var(--text-light-primary);

  &--hidden {
    transform: translateY(-100%);
  }

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 768px) {
      justify-content: start;
    }

    > * {
      flex-shrink: 0;
    }
  }

  &__logo {
    max-width: 157px;
    width: 100%;

    @media screen and (min-width: 768px) {
      margin-left: 20px;
      margin-right: 15px;
    }

    @media screen and (min-width: 1440px) {
      margin-left: 0;
      width: 120px;
    }

    @media screen and (min-width: 1920px) {
      margin-right: 31px;
      width: 152px;
    }
  }

  &__description {
    display: none;
    margin-right: auto;

    .burger & {
      display: inline-block;
      margin-bottom: 12px;
      font-weight: 600;
      font-size: 30px;
      text-align: center;
    }

    @media (min-width: 768px) {
      display: block;
    }

    @media (min-width: 1440px) {
      margin-right: 50px;
    }

    @media (min-width: 1920px) {
      margin-right: 104px;
    }
  }

  &__nav {
    display: none;
    align-items: center;

    .burger & {
      display: block;
      color: var(--text-dark-primary);

      .nav-menu {
        &__list {
          display: block;
        }

        &__item {
          &:hover {
            background-color: var(--accent-secondary-hover);
          }
        }
      }
    }

    @media (min-width: 992px) {
      display: flex;
      margin-right: 20px;
    }

    @media (min-width: 1440px) {
      width: 35%;
    }
  }

  &__contacts {
    display: flex;
    order: 2;

    @media (min-width: 1440px) {
      order: 0;
      margin-right: 20px;
      margin-left: auto;
      gap: 31px;
    }

    @media (min-width: 1920px) {
      margin-right: 37px;
      gap: 40px;
    }
  }

  &__address {
    .header__contacts & {
      display: none;

      @media (min-width: 1440px) {
        display: block;
      }
    }

    .burger & {
      margin-top: 20px;
    }
  }

  &__phone {
    background-color: var(--accent-primary-hover);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;

    @media screen and (min-width: 1440px) {
      width: initial;
      height: initial;
      background-color: transparent;
    }

    &:hover {
      svg {
        transform: scale(1.1);
      }
    }

    span {
      display: none;

      @media (min-width: 1440px) {
        display: block;
      }
    }

    svg {
      width: 20px;
      height: 20px;
      transition: var(--all-transition);

      @media (min-width: 1440px) {
        display: none;
      }
    }
  }

  &__bar {
    display: none;
    align-items: center;

    @media (min-width: 768px) {
      display: flex;
      order: 1;
      margin-right: 20px;
    }

    @media (min-width: 1440px) {
      margin-right: 0;
      margin-left: 6px;
    }

    svg {
      width: 16px;
      margin-right: 4px;
    }
  }

  &__likes {
    display: flex;
    flex-shrink: 0;
    margin-right: 15px;

    @media (min-width: 1920px) {
      margin-right: 20px;
    }
  }

  &__compare {
    display: flex;
    flex-shrink: 0;
  }

  &__count {
    padding: 4px 5px;
    background-color: var(--accent-secondary-hover);
    font-size: 10px;
    line-height: 1;
    font-weight: 600;
    height: 17px;
    margin-top: 4px;
    border-radius: 4px;
  }
}
</style>
