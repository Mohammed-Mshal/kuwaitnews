<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
const searchText = ref('')
</script>
<template>
  <div>
    <AppModalSearch :is-open="isOpen" @close="emit('close')" :showCloseButton="false" :closeOnBackdrop="true"
      root-class="z-[1004] w-full h-[100dvh]"
      modal-class="py-8! px-11! flex flex-col items-center justify-center gap-[18px] w-full h-fit ">
      <div class=" search-modal-content">
        <form class="search-form" action="./search.html" method="get">
          <div class="form-group">
            <div class="wrapper-input">
              <div class="custom-icon">
                <img src="/img/search-gray.svg" alt="Search">
              </div>
              <input type="search" placeholder="بحث" v-model="searchText">
            </div>
          </div>
          <NuxtLink :to="`/search?search=${searchText}`" class="base-btn base-blue" @click="emit('close')">
            بحث
          </NuxtLink>
        </form>
      </div>
    </AppModalSearch>
  </div>
</template>

<style lang="scss">
.search-modal-content {
  border-radius: 0;
  width: 95%;
  z-index: 2;
  box-shadow: 0 16px 48px rgba(40, 41, 61, 0.18);
  max-width: 1522px;

  .search-form {
    display: flex;
    padding-inline-start: 40px;
    background-color: white;

    .form-group {
      flex: 1;

      .wrapper-input input,
      .wrapper-input textarea {
        background: #fff;
      }
    }

    .base-btn {
      flex: 1;
      max-width: 259px;
      border: none;

      @media (max-width:778px) {
        max-width: 120px;

      }
    }
  }
}
</style>