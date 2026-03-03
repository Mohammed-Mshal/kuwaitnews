<script lang="ts" setup>
import { useMyHomeStore } from '~/store/home';
const { featuresNews, getFeaturesNews, isLoading, error } = useMyHomeStore()

const newsContent = ref(featuresNews)
onMounted(async () => {
  const res = await getFeaturesNews()
  newsContent.value = res
})
</script>
<template>
  <section class="featured-news">
    <div class="container md:px-8 px-3">
      <HeaderSection title="الأخبار المميزة" titleType="base-title2" />

      <div class="base-body-content">
        <div class="feature-news-item" v-if="newsContent">
          <div class="imgs-news">
            <NuxtImg :src="newsContent?.featureNews?.image" alt="feature-news" />
          </div>
          <div class="info-news">
            <h4 class="title-news" :class="`bg-[${newsContent?.featureNews?.titleColor}]`">
              {{ newsContent?.featureNews?.title }}
            </h4>
            <div class="space-between"></div>
            <h2 class="news-content" :class="`bg-[${newsContent?.featureNews?.contentColor}]`">
              {{ newsContent?.featureNews?.content }}
            </h2>
          </div>
        </div>
        <div class="popular-news">
          <div class="base-header-section">
            <h4 class="base-title">
              الأكثر شعبية
            </h4>
          </div>
          <div class="list-popular-news">
            <NuxtLink v-for="popularItem in newsContent?.popularNews" :key="popularItem?.id" :to="popularItem.link"
              class="popular-news-item">
              <div class="num-item">
                {{ popularItem.number }}
              </div>
              <div class="info-item">
                <div class="header-info">
                  <h5 class="type-news">
                    {{ popularItem.newsType }}
                  </h5>
                  <div class="date-news">
                    {{ popularItem.dateNews }}
                  </div>
                </div>
                <h4 class="title-news">
                  {{ popularItem.titleNews }}
                </h4>
              </div>
            </NuxtLink>
            <!-- <a href="#" class="popular-news-item">
              <div class="num-item">
                01
              </div>
              <div class="info-item">
                <div class="header-info">
                  <h5 class="type-news">
                    الاقتصاد
                  </h5>
                  <div class="date-news">
                    الخميس، 25 ديسمبر 2025
                  </div>
                </div>
                <h4 class="title-news">
                  يواصل بنك الخليج رحلته نحو التميز ويحقق إنجازات كبيرة خلال عام 2025.
                </h4>
              </div>
            </a>
            <a href="#" class="popular-news-item">
              <div class="num-item">
                01
              </div>
              <div class="info-item">
                <div class="header-info">
                  <h5 class="type-news">
                    الجمعية الوطنية
                  </h5>
                  <div class="date-news">
                    الخميس، 25 ديسمبر 2025
                  </div>
                </div>
                <h4 class="title-news">
                  رجال الإطفاء: وفاة امرأة وطفلين في حريق منزل في منطقة مبارك الكبير.
                </h4>
              </div>
            </a>
            <a href="#" class="popular-news-item">
              <div class="num-item">
                01
              </div>
              <div class="info-item">
                <div class="header-info">
                  <h5 class="type-news">
                    التعليم
                  </h5>
                  <div class="date-news">
                    الخميس، 25 ديسمبر 2025
                  </div>
                </div>
                <h4 class="title-news">
                  يدخل بنك برقان في شراكة استراتيجية مع الجامعة الأمريكية في الكويت لتطوير
                  المواهب الكويتية.
                </h4>
              </div>
            </a> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style></style>