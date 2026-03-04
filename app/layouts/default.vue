<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
const { errorData, hideError, isErrorModalOpen, showErrorModal } = useErrorModal()
const { isSearchModalOpen, hideSearch } = useSearchModal()
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);


</script>

<template>
    <div class="min-h-screen bg-white text-black">
        <AppNavbar />
        <slot />
        <AppFooter />
        <AppErrorModal :is-open="isErrorModalOpen" :error="errorData" @close="hideError" />
        <AppSearchModal :is-open="isSearchModalOpen" @close="hideSearch" />
    </div>

</template>

<style lang="scss" scoped></style>