import { useAppStore } from "~/store/app"

export default defineNuxtPlugin(async () => {
  const appStore = useAppStore()

  await appStore.initialApp()
  if (!appStore.bannersHome || !appStore.header) {
  }
})