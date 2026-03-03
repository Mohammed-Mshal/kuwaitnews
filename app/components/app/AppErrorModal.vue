<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  error: any
}>()

const emit = defineEmits<{
  close: []
}>()

const errorHtml = computed(() => {
  if (!props.error) return ''
  return parseError(props.error)
})
</script>

<template>
  <AppModal :is-open="isOpen" @close="emit('close')" :showCloseButton="false" root-class="z-1001"
    modal-class="py-8! px-11! max-w-md flex flex-col items-center justify-center gap-[18px]">
    <LucideMessageSquareWarning class="w-[100px] h-[100px] mx-auto text-red-500" />
    <div v-if="errorHtml" v-html="errorHtml" class="text-center flex flex-col items-center justify-center gap-4"></div>
    <div v-else class="text-center flex flex-col items-center justify-center gap-[18px]">
      <h3 class="text-lg font-semibold">An error occurred.</h3>
      <p class="error-line">Something went wrong. Please try again.</p>
    </div>
    <button class="cancel-button" @click="emit('close')">
      Cancel
    </button>
  </AppModal>
</template>

<style scoped>
:deep(h3) {
  font-size: 20px;
  font-weight: 600;
  color: var(--main-red);
  text-transform: capitalize;
  margin-bottom: 0px;
}

:deep(div > div) {
  padding: 0.5rem 0;
}

:deep(.error-line) {
  font-size: 18px;
  color: var(--second-gray);
  text-align: center;
  margin-bottom: 0px;
}

:deep(.error-line .attr-text) {
  font-weight: 600;
}

.cancel-button {
  margin-top: 10px;
  max-width: fit-content;
  background-color: #000;
  color: #FFF;
  min-width: 170px;
  padding: 12px 20px;
  border-radius: 999px;
  transition: .3s all ease-in-out;
}

.cancel-button:hover {
  background-color: #000000aa;
}
</style>
