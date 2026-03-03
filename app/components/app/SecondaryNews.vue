<script lang="ts" setup>
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useMyHomeStore } from '~/store/home';
const { getSecondaryNews, secondaryNews, isLoading, error } = useMyHomeStore()
const asideVoteActive = ref<'form-vote' | 'result-votes'>('form-vote')
const toggleAside = (newVal: 'form-vote' | 'result-votes') => {
  asideVoteActive.value = newVal
}
const newsContent = ref(secondaryNews)
onMounted(async () => {
  const res = await getSecondaryNews()
  newsContent.value = res
})
</script>
<template>
  <section class="secondary-news">
    <div class="container md:px-8 px-3">
      <div class="base-body-content">
        <div class="secondary-news-slider">
          <Swiper :speed="1500" :modules="[Autoplay, EffectFade]" :autoplay="{
            delay: 2000
          }" :slides-per-view="1" :space-between="32" effect="fade" :fade-effect="{
            crossFade: true
          }" class="swiper swiper-secondary-news">
            <SwiperSlide v-for="secondaryNewsItem in newsContent" :key="secondaryNewsItem.id">
              <div class="wrapper-slide">
                <div class="info-slide">
                  <div class="header-slide">
                    <h5 class="type-news">
                      {{ secondaryNewsItem.typeNews }}
                    </h5>
                    <h3 class="title-news">
                      {{ secondaryNewsItem.titleNews }}
                    </h3>
                  </div>
                  <div class="description-slide">
                    {{ secondaryNewsItem.description }}
                  </div>
                  <NuxtLink :to="secondaryNewsItem.link" class="base-btn btn-link">
                    <span>
                      اقرأ المزيد
                    </span>
                    <span class="icon">
                      <img src="/img/arrow-goto.svg" alt="arrow-goto">
                    </span>
                  </NuxtLink>

                </div>
                <div class="image-slide">
                  <NuxtImg :src="secondaryNewsItem.image" loading="lazy" :alt="secondaryNewsItem.titleNews" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="votes">
          <div class="base-header-section">
            <h5 class="base-title">
              الاستطلاعات
            </h5>
            <button type="button" class="base-btn custom-link toggle-votes"
              @click="() => asideVoteActive === 'form-vote' && toggleAside('result-votes')">
              عرض النتائج
            </button>
          </div>
          <h5 class="subtitle">
            كيف ترى موقع كويت نيوز؟
          </h5>
          <div class="wrapper-form-vote" :class="`${asideVoteActive === 'form-vote' && 'active'}`">
            <form action="" class="form-vote">
              <div class="form-group select-group">
                <input type="radio" value="excellent" name="vote" id="excellent">
                <label class="base-select-label" for="excellent">
                  <div class="check-icon"></div>
                  <div class="option-text">
                    ممتاز
                  </div>
                </label>
              </div>
              <div class="form-group select-group">
                <input type="radio" value="good" name="vote" id="good">
                <label class="base-select-label" for="good">
                  <div class="check-icon"></div>
                  <div class="option-text">
                    جيد
                  </div>
                </label>
              </div>
              <div class="form-group select-group">
                <input type="radio" value="bad" name="vote" id="bad">
                <label class="base-select-label" for="bad">
                  <div class="check-icon"></div>
                  <div class="option-text">
                    سيء
                  </div>
                </label>
              </div>
              <div class="form-group select-group">
                <input type="radio" value="need-enhance" name="vote" id="need-enhance">
                <label class="base-select-label" for="need-enhance">
                  <div class="check-icon"></div>
                  <div class="option-text">
                    يمكن تحسينه
                  </div>
                </label>
              </div>
              <div class="form-group select-group">
                <input type="radio" value="no-comment" name="vote" id="no-comment">
                <label class="base-select-label" for="no-comment">
                  <div class="check-icon"></div>
                  <div class="option-text">
                    لا توجد تعليقات
                  </div>
                </label>
              </div>
              <button class="base-btn base-blue" type="submit">
                تصويت
              </button>
            </form>

          </div>
          <div class="wrapper-result-votes" :class="`${asideVoteActive === 'result-votes' && 'active'}`">
            <div class="result-row">
              <h4 class="title">
                ممتاز (44%، 18 الأصوات)
              </h4>
              <div class="progress">
                <div class="complete" style="width: 70%;"></div>
              </div>
            </div>
            <div class="result-row">
              <h4 class="title">
                جيد (22%، 9 الأصوات)
              </h4>
              <div class="progress">
                <div class="complete" style="width: 60%;"></div>
              </div>
            </div>
            <div class="result-row">
              <h4 class="title">
                سيء (15%، 6 الأصوات)
              </h4>
              <div class="progress">
                <div class="complete" style="width: 30%;"></div>
              </div>
            </div>
            <div class="result-row">
              <h4 class="title">
                يمكن تحسينه (15%، 6 الأصوات)
              </h4>
              <div class="progress">
                <div class="complete" style="width: 60%;"></div>
              </div>
            </div>
            <div class="result-row">
              <h4 class="title">
                لا توجد تعليقات (5%، 2 الأصوات)
              </h4>
              <div class="progress">
                <div class="complete" style="width: 10%;"></div>
              </div>
            </div>
            <button class="base-btn base-blue toggle-votes" type="button"
              @click="() => asideVoteActive === 'result-votes' && toggleAside('form-vote')">
              تصويت
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss">
.secondary-news {
  .container {
    margin-bottom: 32px;
    margin-inline: auto;

    .base-body-content {
      padding-bottom: 32px;
      border-bottom: 1px solid #dbdee1;
      display: flex;
      justify-content: space-between;
      gap: 40px;
      max-width: 100%;

      .secondary-news-slider {
        flex-shrink: 1;
        width: auto;
        max-width: 1342px;
        min-width: 0;
        background: #f3f3f3;

        .swiper-secondary-news {
          width: 100%;

          .swiper-slide {
            height: 100%;

            .wrapper-slide {
              display: flex;
              align-items: center;
              gap: 32px;

              @media (max-width: 992px) {
                flex-direction: column;
                gap: 0;
              }

              .info-slide {
                padding: 64px;
                padding-inline-end: 0;
                display: flex;
                flex-direction: column;
                gap: 24px;

                @media (max-width: 1200px) {
                  padding: 32px;
                  padding-inline-end: 0;
                }

                @media (max-width: 992px) {
                  padding: 32px 24px;
                }

                .header-slide {
                  display: flex;
                  flex-direction: column;
                  gap: 16px;

                  .type-news {
                    font-size: var(--body-2);
                    color: #196ee5;
                    font-weight: 700;
                    margin: 0;
                  }

                  .title-news {
                    font-size: var(--secondary-news);
                    font-weight: 700;
                    margin: 0;
                  }
                }

                .description-slide {
                  font-size: var(--body-1);
                  font-weight: 400;
                }

                .btn-link {
                  text-decoration: none;
                  color: black;
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  font-weight: 700;
                  font-size: var(--body-4);

                  .icon {
                    width: 12px;
                    transition: 0.3s all ease-in-out;
                  }

                  &:hover {
                    .icon {
                      translate: -6px 0;
                    }
                  }
                }
              }

              .image-slide {
                flex: 1 1 auto;
                height: 100%;
                display: flex;
                max-width: 600px;
                position: relative;

                // handle before
                &::before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(180deg,
                      rgba(243, 243, 243, 0) 73.54%,
                      #f3f3f3 100%);
                  pointer-events: none;
                }

                @media (max-width: 1600px) {
                  max-width: 400px;
                }

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }
          }
        }
      }

      .votes {
        min-width: 360px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid #dbdee1;

        .subtitle {
          font-size: var(--body-2);
          margin: 0;
          padding-bottom: 24px;
          border-bottom: 1px solid #dbdee1;
        }

        .wrapper-form-vote {
          display: none;

          .form-vote {
            display: flex;
            flex-direction: column;
            gap: 13.4px;
            width: 100%;
          }
        }

        .wrapper-result-votes {
          display: none;
          flex-direction: column;
          gap: 13.4px;

          .result-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #dbdee1;
            padding: 12px 16px;
            gap: 8px;

            .title {
              margin: 0;
              font-weight: 500;
              font-size: 16px;
              line-height: normal;
            }

            .progress {
              display: flex;
              height: 7px;
              background: #efefef;
              width: 133px;
              display: flex;
              border-radius: 0;

              .complete {
                display: flex;
                height: 100%;
                background-color: var(--mid-blue);
              }
            }
          }
        }

        .active {
          display: flex;
        }
      }

      @media (max-width: 1200px) {
        flex-direction: column;
      }
    }
  }
}
</style>