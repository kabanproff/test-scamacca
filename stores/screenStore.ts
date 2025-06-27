import { defineStore } from "pinia";
import { onBeforeUnmount, onMounted, ref } from "vue";

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

const breakpoints: Record<ScreenSize, string> = {
  xs: "(max-width: 575.98px)",
  sm: "(min-width: 576px) and (max-width: 767.98px)",
  md: "(min-width: 768px) and (max-width: 991.98px)",
  lg: "(min-width: 992px) and (max-width: 1439.98px)",
  xl: "(min-width: 1440px) and (max-width: 1919.98px)",
  xxl: "(min-width: 1920px)",
};

export const useScreenStore = defineStore("screen", () => {
  const screen = ref<ScreenSize>("xs");
  const width = ref(0);
  const isDesktop = ref(false);

  let mqls: Record<ScreenSize, MediaQueryList>;

  function updateScreen() {
    if (typeof window === "undefined") return;

    width.value = window.innerWidth;

    if (mqls.xxl.matches) {
      screen.value = "xxl";
    } else if (mqls.xl.matches) {
      screen.value = "xl";
    } else if (mqls.lg.matches) {
      screen.value = "lg";
    } else if (mqls.md.matches) {
      screen.value = "md";
    } else if (mqls.sm.matches) {
      screen.value = "sm";
    } else {
      screen.value = "xs";
    }

    // isDesktop.value = width.value >= 991.98;
    isDesktop.value = width.value >= 1439.98;
  }

  onMounted(async () => {
    if (typeof window === "undefined") return;
    mqls = Object.fromEntries(
      Object.entries(breakpoints).map(([key, query]) => [
        key,
        window.matchMedia(query),
      ])
    ) as Record<ScreenSize, MediaQueryList>;

    for (const key in mqls) {
      mqls[key as ScreenSize].addEventListener("change", updateScreen);
    }
    setTimeout(updateScreen);
  });

  onBeforeUnmount(() => {
    if (typeof window === "undefined") return;

    for (const key in mqls) {
      mqls[key as ScreenSize].removeEventListener("change", updateScreen);
    }
  });

  return {
    screen,
    width,
    isDesktop,
  };
});
