<script lang="ts" setup>
import { useMyHomeStore } from '~/store/home'

const { getKuwaitNews, kuwaitnews, isLoading, error } = useMyHomeStore()

const kuwaitNewsState = ref(kuwaitnews)
onMounted(async () => {
  const res = await getKuwaitNews()
  kuwaitNewsState.value = res
})
</script>
<template>
  <section class="kuwaitnews">
    <div class="container mx-auto md:px-8 px-3">
      <HeaderSection title="أخبار الكويت" title-type="base-title2" :link="{ text: 'عرض الكل', url: '#' }" />
      <div class="base-content-section">
        <NuxtLink :to="news.link" v-for="news in kuwaitNewsState" :key="news.id" class="custom-news-card">
          <div class="image-news">
            <NuxtImg :src="news.image" :alt="news.title" />
          </div>
          <div class="body-news">
            <div class="date-news">
              <span class="icon">
                <img src="/img/clock.svg" alt="clock" loading="lazy">
              </span>
              <span>
                {{ news.date }}
              </span>
            </div>
            <h4 class="title-news">
              {{ news.title }}
            </h4>
            <div class="desc-news" v-if="news.description">
              <p v-for="(desc, i) in news.description" :key="`${news.title}-${i}`">
                {{ desc }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>



<style lang="scss">
.kuwaitnews {
  .container {
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .base-content-section {
      display: grid;
      grid-template-columns: 3fr 5fr 3fr;
      grid-auto-flow: dense;
      gap: 64px 104px;

      .custom-news-card:first-child {
        grid-row: span 2;
        grid-column-start: 2;

        .image-news {
          height: 432px;
        }
      }

      @media (max-width: 1200px) {
        gap: 32px;
      }

      @media (max-width: 992px) {
        gap: 16px;
        grid-template-columns: repeat(2, 1fr);

        .custom-news-card {
          .image-news {
            height: 150px;
          }
        }

        .custom-news-card:first-child {
          grid-row: auto;
          grid-row-start: 2;
          grid-column: span 2;
          grid-column-start: 0;

          .image-news {
            height: 250px;
          }

          .desc-news {
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>