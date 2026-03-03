  <script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    titleType: {
      type: String
    },
    link: {
      type: Object,
      properties: {
        text: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    }
  })
</script>
<template>
  <div class="base-header-section">
    <div class="left-side">
      <h4 :class="`${titleType==='base-title2'?'base-title2':'base-title'}`">
        {{ title }}
      </h4>
    </div>
    <div class="right-side" v-if="link">
      <NuxtLink :to="link.url" class="base-link">
        {{ link.text }}
      </NuxtLink>
    </div>
  </div>
</template>


<style lang="scss">
.base-header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .base-title {
    font-weight: 700;
    font-size: var(--heading-5);
    margin: 0;
  }

  .base-title2 {
    font-weight: 700;
    font-size: var(--heading-3);
    margin: 0;
  }

  .base-link {
    color: var(--mid-blue);
    font-weight: 700;
    font-size: var(--header-links);
    text-decoration: none;
    transition: .3s all ease-in-out;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>