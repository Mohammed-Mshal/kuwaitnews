import { useAppStore } from "~/store/app"

// Get Initial App Data (Theme, Site Settings, Brands, Banners)
export default defineNuxtPlugin(async () => {
  const appStore = useAppStore()


  if (!appStore.bannersHome || !appStore.header) {
    await appStore.initialApp()
  }
})