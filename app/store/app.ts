import type { Header } from "~/types/header.type"
import type { HomeBanner } from "~/types/homeBanner.type"

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            isLoading: false,
            error: null,
            bannersHome: null as HomeBanner | null,
            header: null as Header | null,
            headersState: [],
            footerState: []
        }
    },
    actions: {
        async initialApp() {
            const [bannersHome, header] = await Promise.all([
                useApi<HomeBanner>('/api/banners'),
                useApi<Header>('/api/header'),
            ])
            this.bannersHome = bannersHome
            this.header = header
        }
    }
})