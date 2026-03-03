import type { FeaturesNews } from "~/types/featureNews.type"
import type { BreakingNewsItem, KuwaitNews } from "~/types/home.type"
import type { SecondaryNewsItem } from "~/types/secondaryNews.type"

export const useMyHomeStore = defineStore('myHomeStore', {
  state: () => {
    return {
      isLoading: false,
      error: null,
      featuresNews: null as FeaturesNews | null,
      secondaryNews: null as SecondaryNewsItem[] | null,
      breakingNews: null as BreakingNewsItem[] | null,
      kuwaitnews: null as KuwaitNews[] | null,

    }
  },
  actions: {
    async getBreakingNews() {
      const breakingNews = await useApi<BreakingNewsItem[]>('/api/breakingNews')
      this.breakingNews = breakingNews
      return breakingNews
    },
    async getFeaturesNews() {
      const featuresNews = await useApi<FeaturesNews>('/api/featureNews')
      this.featuresNews = featuresNews
      return featuresNews
    },
    async getSecondaryNews() {
      const secondaryNews = await useApi<SecondaryNewsItem[]>('/api/secondaryNews')
      this.secondaryNews = secondaryNews
      return secondaryNews
    },
    async getKuwaitNews() {
      const kuwaitnews = await useApi<KuwaitNews[]>('/api/kuwaitnews')
      this.kuwaitnews = kuwaitnews
      return kuwaitnews
    },
  }
})
