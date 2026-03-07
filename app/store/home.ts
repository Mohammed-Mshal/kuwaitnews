import type { FeaturesNews } from "~/types/featureNews.type"
import type { BreakingNewsItem, KuwaitNews } from "~/types/home.type"
import type { SecondaryNewsItem } from "~/types/secondaryNews.type"
import { useHomeApi } from "~/composables/app/useHomeApi"
import { useAppStore } from "./app"

export const useMyHomeStore = defineStore('myHomeStore', {
  state: () => {
    return {
      initialized: false,
      error: null as string | null,
      featuresNews: null as FeaturesNews | null,
      secondaryNews: null as SecondaryNewsItem[] | null,
      breakingNews: null as BreakingNewsItem[] | null,
      kuwaitnews: null as KuwaitNews[] | null,

    }
  },
  actions: {
    async loadHomeData() {
      if (this.initialized) return true
      const { loadHomeData } = useHomeApi()
      const errorStore = useErrorModal()
      const appStore = useAppStore()
      appStore.isLoading = true
      try {
        const data = await loadHomeData()
        this.featuresNews = data.featuresNews
        this.secondaryNews = data.secondaryNews
        this.breakingNews = data.breakingNews
        this.kuwaitnews = data.kuwaitnews
        this.initialized = true
        return true
      } catch (error) {
        errorStore.showErrorModal(error)
        this.error = (error as { message: string })?.message
      }finally {
        appStore.isLoading = false
      }
    }
  }
})
