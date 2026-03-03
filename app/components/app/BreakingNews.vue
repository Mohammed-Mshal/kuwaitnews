<script lang="ts" setup>
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useMyHomeStore } from '~/store/home';
const { breakingNews, getBreakingNews, isLoading, error } = useMyHomeStore()
const latestNews = ref(breakingNews)
onMounted(async () => {
  const res = await getBreakingNews()
  latestNews.value = res
})
</script>
<template>
  <div class="latest-news">
    <div class="container md:px-8 px-3">
      <HeaderSection title="أخبار عاجلة" :link="{ text: 'عرض الكل', url: '#' }" />
      <Swiper class="swiper-latest-news" :loop="true" :speed="600" :modules="[Autoplay]" :autoplay="{ delay: 2000 }"
        :breakpoints="{
          1200: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          0: {
            slidesPerView: 'auto',
            spaceBetween: 8,
          },
        }">
        <SwiperSlide v-for="news in latestNews" :key="news.id">
          <NuxtLink :to="news.link" class="latest-news-card">
            <div class="right-side">
              <div class="news-img">
                <NuxtImg :src="news.image" alt="latest-news4" />
              </div>
            </div>
            <div class="left-side">
              <h5 class="title-card">
                {{ news.title }}
              </h5>
              <div class="date-news">
                <span class="icon">
                  <img src="/img/clock.svg" alt="clock">
                </span>
                <span>
                  {{ news.date }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>



<style lang="scss">
.latest-news {
  .container {
    margin-block: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-inline: auto;

    .base-body-content {
      padding-bottom: 32px;
      border-bottom: 1px solid #dbdee1;
    }

    .swiper-latest-news {
      width: 100%;

      .swiper-slide {
        @media (max-width: 599px) {
          max-width: 160px;
        }
      }

      .latest-news-card {
        display: flex;
        align-items: center;
        gap: 16px;
        max-width: 367px;
        text-decoration: none;

        .right-side {
          .news-img {
            width: 104px;
            height: 72px;
            display: flex;
            background: var(--white-2);

            img {
              height: 100%;
              width: 100%;
              object-fit: contain;
            }
          }
        }

        .left-side {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .title-card {
            font-weight: 500;
            font-size: var(--header-links);
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: black;
          }

          .date-news {
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: var(--body-3);
            gap: 4px;
            color: #aaaaaa;

            .icon {
              height: 12px;
              width: 12px;
              display: flex;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
          }
        }

        @media (max-width: 599px) {
          max-width: 160px;
          flex-direction: column;
          align-items: stretch;

          .right-side {
            .news-img {
              width: 100%;
              height: 84px;
            }
          }
        }
      }
    }
  }
}
</style>