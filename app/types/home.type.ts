export type BaseNews = {
    id: string,
    title: string
    date: Date
    image: string
    link: string
}
export type BreakingNewsItem = BaseNews

export type KuwaitNews = BaseNews & {
    description?: string[]
}