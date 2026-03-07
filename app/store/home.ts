import type { FeaturesNews } from "~/types/featureNews.type"
import type { BreakingNewsItem, KuwaitNews } from "~/types/home.type"
import type { SecondaryNewsItem } from "~/types/secondaryNews.type"
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
      const errorStore = useErrorModal()
      const appStore = useAppStore()
      appStore.isLoading = true
      try {
        const [breakingNews, featuresNews, secondaryNews, kuwaitnews] = await Promise.all([
          $fetch<BreakingNewsItem[]>('/api/breakingNews'),
          $fetch<FeaturesNews>('/api/featureNews'),
          $fetch<SecondaryNewsItem[]>('/api/secondaryNews'),
          $fetch<KuwaitNews[]>('/api/kuwaitnews')
        ])
        this.featuresNews = featuresNews
        this.secondaryNews = secondaryNews
        this.breakingNews = breakingNews
        this.kuwaitnews = kuwaitnews
        this.initialized = true
        return true
      } catch (error) {
        errorStore.showErrorModal(error)
        this.error = (error as { message: string })?.message
      } finally {
        appStore.isLoading = false
      }
    }
  }
})
