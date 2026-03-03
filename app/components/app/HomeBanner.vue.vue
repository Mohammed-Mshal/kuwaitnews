<script lang="ts" setup>
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue'
import { useAppStore } from '~/store/app';
const activeIndex = ref(0)
const bannerHomePage = ref<HTMLElement>()
const appStore = useAppStore()
const handleChangeSlide = (newIndex: number) => {
  activeIndex.value = newIndex
}
</script>
<template>
  <section class="banner">
    <div class="container">
      <div class="banner-content">
        <div class="bg-slide">
          <NuxtImg v-for="(bannerSlide, index) in appStore.bannersHome?.banners" :src="bannerSlide.bannerImage"
            :data-bg-index="index" :alt="bannerSlide.name" :class="activeIndex === index && 'active'"
            :key="bannerSlide.id" />
        </div>
        <div class="overlay"></div>
        <Swiper class="swiper-banner-homepage" direction="vertical" :loop="false" :rewind="true" :autoHeight="true"
          :modules="[Autoplay,Pagination]" spaceBetween="80" :speed="800" :autoplay="{
            delay: 1500,
            disableOnInteraction: false
          }" :pagination="{
            el: '.banner-pagination',
            clickable: true,
          }" :keyboard="{
            enabled: true,
            onlyInViewport: true,
          }" @slideChange="(swiper) => {
            handleChangeSlide(swiper.activeIndex);
          }" @swiper="() => {
            handleChangeSlide(0);
          }" ref="swiper-banner-homepage">
          <SwiperSlide v-for="bannerSlide in appStore.bannersHome?.banners" :key="bannerSlide.id">
            <div class="slide-content">
              <h4 class="title-news" :data-color="bannerSlide.titleColor"
                :style="`background-color: ${bannerSlide.titleColor};`">
                {{ bannerSlide.titleNews }}
              </h4>
              <div class="space-between"></div>
              <h2 class="news-content" :data-color="bannerSlide.descriptionColor"
                :style="`background-color: ${bannerSlide.descriptionColor};`">
                {{ bannerSlide.descriptionNews }}
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="bottom-side">
          <div class="right-side">
            <div class="banner-pagination"></div>
          </div>
          <div class="left-side">
            <div class="slide-icon">
              <div class="wrapper-icon" :class="activeIndex === index && 'active'"
                :style="`background-color:${activeIndex === index && bannerSlide.iconColor} ;`"
                v-for="(bannerSlide, index) in appStore.bannersHome?.banners" :data-icon-index="index"
                :key="bannerSlide.id">
                <img :src="bannerSlide.iconNews" :alt="bannerSlide.name" loading="lazy">
              </div>
            </div>
            <div class="weather-info">
              <div class="item-info date">
                <div class="icon">
                  <img src="/img/calendar.svg" alt="calendar">
                </div>
                <div class="body-item">
                  <h5 class="title">
                    {{ appStore.bannersHome?.weatherDay.day }}
                  </h5>
                  <div class="subtitle">
                    {{ appStore.bannersHome?.weatherDay.date }}
                  </div>
                </div>
              </div>
              <div class="item-info weather ">
                <div class="icon">
                  <img src="/img/clouds.svg" alt="clouds">
                </div>
                <div class="body-item">
                  <h5 class="title">
                    {{ appStore.bannersHome?.weatherDay.temperature }}<sup>o</sup> {{
                      appStore.bannersHome?.weatherDay.weatherState }}
                  </h5>
                  <div class="subtitle">
                    {{ appStore.bannersHome?.weatherDay.location }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>