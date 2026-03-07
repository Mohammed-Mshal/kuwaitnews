import type { Header } from "~/types/header.type"
import type { HomeBanner } from "~/types/homeBanner.type"

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            isLoading: false,
            initialized: false,
            error: null as string | null,
            bannersHome: null as HomeBanner | null,
            header: null as Header | null,
            footer: [],

        }
    },
    actions: {
        async initialApp() {
            if (this.initialized) return true
            const errorStore = useErrorModal()
            this.isLoading = true
            try {
                const [bannersHome, header] = await Promise.all([
                    $fetch<HomeBanner>('/api/banners'),
                    $fetch<Header>('/api/header'),
                ])
                this.bannersHome = bannersHome
                this.header = header
                this.initialized = true
                return true
            } catch (error) {
                errorStore.showErrorModal(error)
                this.error = (error as { message: string })?.message
            }
            finally {
                this.isLoading = false
            }
        }
    }
})