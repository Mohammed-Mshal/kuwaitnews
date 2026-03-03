export default defineEventHandler(async (event) => {
  return {
    logo: 'http://localhost:3000/img/logo-header.svg',
    links: [
      {
        link: '/',
        text: 'الكويت',
      },
      {
        link: '/',
        text: 'الشرق الأوسط',
      },
      {
        link: '/',
        text: 'العالم',
      },
      {
        link: '/',
        text: 'التعليم',
      },
      {
        link: '/',
        text: 'الاقتصاد',
      },
      {
        link: '/',
        text: 'الرياضة',
      },
      {
        link: '/',
        text: 'الفنون والثقافة',
      },
      {
        link: '/',
        text: 'الصحة',
      },
      {
        link: '/',
        text: 'العلوم والتكنولوجيا',
      },
      {
        link: '/',
        text: 'مجلس الأمة',
      },
      {
        link: '/',
        text: 'مجتمع الكويت',
      },
    ]
  }
})
