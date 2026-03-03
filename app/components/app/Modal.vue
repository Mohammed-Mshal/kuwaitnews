<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  isOpen: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  rootClass?: string
  backdropClass?: string
  modalClass?: string
  timeout?: number
}>(), {
  closeOnBackdrop: true,
  closeOnEscape: true,
  showCloseButton: true,
})

const emit = defineEmits<{
  close: []
}>()

const handleBackdropClick = (event: MouseEvent) => {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    emit('close')
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

const preventBodyScroll = () => {
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (import.meta.client) {
    preventBodyScroll()
    if (isOpen) {
      if (props.timeout) {
        setTimeout(() => emit('close'), props.timeout)
      }
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }
  }
}, { immediate: true })

onMounted(() => {
  if (import.meta.client && props.isOpen) {
    document.addEventListener('keydown', handleEscape)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleEscape)
  }
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0 backdrop-blur-none" enter-to-class="opacity-100 backdrop-blur-sm"
      leave-active-class="transition-opacity duration-200 ease-in" leave-from-class="opacity-100 backdrop-blur-sm"
      leave-to-class="opacity-0 backdrop-blur-none">
      <div v-if="isOpen" :class="`'fixed inset-0 z-1000 flex items-center justify-center ${rootClass}`">
        <!-- Backdrop -->
        <div :class="`absolute inset-0 bg-black/20 backdrop-blur-sm ${backdropClass}`" @click="handleBackdropClick" />

        <!-- Modal Content -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-4">
          <div v-if="isOpen" :class="`absolute inset-0 bg-black/20 backdrop-blur-sm ${modalClass}`" @click.stop>
            <!-- Close Button -->
            <button v-if="showCloseButton"
              class="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full! bg-black text-white transition-colors border-2! hover:border-black! hover:bg-white! hover:text-black!"
              @click="emit('close')" aria-label="Close modal">
              <LucideX class="h-3.5 w-3.5"/>
            </button>

            <!-- Slot for modal content -->
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
:deep(.popup) {
  padding: 0px;
  background-color: transparent;
  backdrop-filter: none;
}
</style>