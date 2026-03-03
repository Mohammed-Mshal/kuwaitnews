export type HomeBanner = {
    banners: [
        {
            id: string,
            name: string,
            bannerImage: string,
            titleNews: string,
            titleColor: string,
            descriptionNews: string,
            descriptionColor: string,
            iconNews: string,
            iconColor: string
        }
    ],
    weatherDay: {
        temperature: number,
        weatherState: string,
        day: string,
        date: string,
        location: string,
    }
}