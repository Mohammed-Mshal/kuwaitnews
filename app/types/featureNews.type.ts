export type FeatureNews = {
    image: string,
    title: string,
    titleColor: string,
    content: string,
    contentColor: string,
}

export type PopularNews = {
    id: string,
    number: string,
    newsType: string,
    dateNews: string,
    titleNews: String,
    link: string
}

export type FeaturesNews = {
    featureNews: FeatureNews,
    popularNews: PopularNews[]
}