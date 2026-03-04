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
      root-class="modal-search" modal-class="wrapper-modal">
      <div class=" search-modal-content">
        <form class="search-form" action="./search.html" method="get">
          <div class="form-group">
            <div class="wrapper-input">
              <div class="custom-icon">
                <NuxtImg src="/img/search-gray.svg" alt="Search" />
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
.modal-search {
  z-index: 1004;
  width: 100%;
  height: 100dvh;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s all ease-in-out;

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.2);

    &.active {
      opacity: 1;
    }
  }
}

.wrapper-modal {
  padding: 32px 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: 30;
  width: 100%;
  transition: .3s all ease-in-out;
}

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
      text-decoration: none;
      @media (max-width:778px) {
        max-width: 120px;

      }
    }
  }
}
</style>