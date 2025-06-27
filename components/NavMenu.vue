<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

interface MenuItem {
  name: string;
  submenu?: MenuItem[];
  link?: string;
}

const props = defineProps<{
  menuItems: MenuItem[];
  isMobile: boolean;
  className?: string;
}>();

const navRef = ref<HTMLElement | null>(null);
const moreRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement | null>(null);
const dempherRef = ref<number>(50);
const con = ref<number>(0);

const visibleItems = ref<MenuItem[]>(
  JSON.parse(JSON.stringify(props.menuItems))
);
const hiddenItems = ref<MenuItem[]>([]);
const activeSubmenu = ref<string[]>([]);

function updateMenuItems() {
  if (!navRef.value || !itemRefs.value) return;

  const containerWidth = (navRef.value.clientWidth || 0) as number;
  const itemWidth = (itemRefs.value.scrollWidth || 0) as number;
  const moreItemWidth = (moreRef?.value?.offsetWidth || 0) as number;

  const visibleItemsWidth = itemWidth + moreItemWidth;

  const visible: MenuItem[] = visibleItems.value;
  const hidden: MenuItem[] = hiddenItems.value;

  if (con.value > props.menuItems.length + 2) {
    con.value = 0;
    return;
  }


  if (
    visibleItemsWidth + dempherRef.value < containerWidth &&
    visibleItemsWidth - dempherRef.value > containerWidth
  )
    return;
  if (
    hidden.length > 0 &&
    visibleItemsWidth + dempherRef.value < containerWidth
  ) {
    let el = hidden.pop() as MenuItem;
    visible.push(el);
  } else if (
    visible.length > 0 &&
    visibleItemsWidth - dempherRef.value > containerWidth
  ) {
    let el = visible.pop() as MenuItem;
    hidden.push(el);
  }
  con.value += 1;

  visibleItems.value = visible;
  hiddenItems.value = hidden;
}

function showSubmenu(...args: string[]) {
  activeSubmenu.value = [...args];
}

function hideSubmenu(name: string) {
  let ind = activeSubmenu.value.indexOf(name);
  if (ind !== -1) activeSubmenu.value = activeSubmenu.value.slice(0, ind + 1);
}

const debUpdateMenuItems = debounce(updateMenuItems, 500);

onMounted(() => {
  if (props.isMobile) return;
  nextTick(() => {
    updateMenuItems();
  });
  window.addEventListener("resize", debUpdateMenuItems);
});

onUnmounted(() => {
  window.removeEventListener("resize", debUpdateMenuItems);
});

watch([visibleItems.value, hiddenItems.value], () => {
  if (props.isMobile) return;
  nextTick(() => {
    updateMenuItems();
  });
});
</script>

<template>
  <nav
    :class="['nav-menu', className]"
    role="navigation"
    ref="navRef"
  >
    <ul
      class="nav-menu__list"
      ref="itemRefs"
    >
      <li
        v-for="item in visibleItems"
        :key="item.name"
        class="nav-menu__item"
        @mouseenter="showSubmenu(item.name)"
        @mouseleave="hideSubmenu(item.name)"
        @click="hideSubmenu(item.name)"
        :class="{ active: item.submenu && activeSubmenu[0] === item.name }"
      >
        <a
          href="#"
          class="nav-menu__link"
        >
          {{ item.name }}
          <Icon
            v-if="item.submenu?.length"
            name="fi-rr-angle-small-down"
            size="14"
          />
        </a>
        <ul
          v-if="item.submenu?.length"
          class="nav-menu__submenu"
          :class="{ active: item.submenu && activeSubmenu[0] === item.name }"
        >
          <li
            v-for="sub in item.submenu"
            :key="sub.name"
            class="nav-menu__submenu-item"
            @mouseenter="showSubmenu(item.name, sub.name)"
            @mouseleave="hideSubmenu(sub.name)"
          >
            <a
              href="#"
              class="nav-menu__submenu-link"
              >{{ sub.name }}</a
            >
          </li>
        </ul>
      </li>

      <li
        v-if="hiddenItems.length"
        class="nav-menu__item nav-menu__item--more"
        @mouseenter="showSubmenu('more')"
        @mouseleave="hideSubmenu('more')"
        ref="moreRef"
      >
        <button
          class="nav-menu__link"
        >
          Еще
          <Icon
            name="fi-rr-angle-small-down"
            size="14"
          />
        </button>
        <ul class="nav-menu__submenu">
          <li
            v-for="item in hiddenItems"
            :key="item.name"
            class="nav-menu__submenu-item"
            @mouseenter="showSubmenu('more', item.name)"
            @mouseleave="hideSubmenu(item.name)"
          >
            <a
              :href="item?.link || '#'"
              class="nav-menu__submenu-link"
              >{{ item.name }}</a
            >
            <ul
              v-if="item.submenu?.length"
              class="nav-menu__submenu"
            >
              <li
                v-for="sub in item.submenu"
                :key="sub.name"
                class="nav-menu__submenu-item"
              >
                <a
                  :href="sub?.link || '#'"
                  class="nav-menu__submenu-link"
                  >{{ sub.name }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav-menu {
  &__list {
    display: flex;
    align-items: center;
    gap: var(--header-gap);
    flex-direction: row;
    margin: 0;
    padding: 0;
    list-style: none;
    flex-shrink: 0;

    @media (min-width: 992px) {
      gap: 15px;
    }

    @media (min-width: 1440px) {
      gap: 21px;
    }

    @media (min-width: 1920px) {
      gap: 40px;
    }
  }

  &__item {
    position: relative;
    padding: 5px 0;
    border-bottom: 1px solid var(--bg-dark-lightdark);

    &:hover, &:active {

      & > .nav-menu__submenu {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        display: block;
      }
    }

    @media screen and (min-width: 992px) {
      border-bottom: none;
    }

    &:hover svg {
      transform: rotate(180deg);
    }

    svg {
      transition: var(--all-transition);
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 5px;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
  }

  &__submenu {
    display: none;
    position: relative;
    top: 100%;
    left: 0;
    list-style: none;
    padding: 0 1rem;
    min-width: 150px;
    background: white;
    z-index: 1100;
    margin: 0;
    color: var(--text-dark-primary);
    border: 0px solid var(--bg-dark-lightdark);

    @media screen and (min-width: 992px) {
      position: absolute;
      border-width: 1px;
    }

    &-item {
      position: relative;

      &:hover {
        color: var(--accent-primary-hover);

        & > .nav-menu__submenu {
          display: block;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
      }
    }

    &-link {
      color: inherit;
      text-decoration: none;
      display: block;
      padding: 2px 0;
    }
  }
}
</style>
