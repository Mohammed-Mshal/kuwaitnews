export default defineEventHandler((event) => {
    return {
        "banners": [
            {
                "id": "1",
                "name": "Banner1",
                "bannerImage": "/img/banner-1.jpg",
                "titleNews": "توقعات الطقس",
                "titleColor": "#FFD500",
                "descriptionNews": " ستنخفض درجات الحرارة ويبرد الطقس اعتبارًا من يوم الثلاثاء ، مع احتمال حدوث صقيع يوم الأربعاء.",
                "descriptionColor": "#050F9C",
                "iconNews": "/img/banner-news-icon1.svg",
                "iconColor": "#7EB3F9"
            },
            {
                "id": "2",
                "name": "Banner2",
                "bannerImage": "/img/banner-1.jpg",
                "titleNews": "توقعات الطقس",
                "titleColor": "#C4D8E9",
                "descriptionNews": " عقد مجلس الوزراء اجتماعه الأسبوعي في قصر بيان، برئاسة سمو الشيخ أحمد عبدالله",
                "descriptionColor": "#6C2A00",
                "iconNews": "/img/banner-news-icon2.svg",
                "iconColor": "#C4D8E9"
            }
        ],
        "weatherDay": {
            "temperature": 32,
            "weatherState": "ممطر",
            "day": "الإثنين",
            "date": " 25 ديسمبر 2025",
            "location": "الكويت"
        }
    }
})