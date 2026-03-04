<script setup lang="ts">
import { ScrollTrigger } from 'gsap/all';
import { useAppStore } from '~/store/app';
const { closeNavbar, isOpened, toggleNavbar } = useNavbar()
const { locale, setLocale } = useI18n()
const { showSearchModal } = useSearchModal()

const appStore = useAppStore()

const fullLogo = computed(() => appStore.header?.logo ?? null)
const mainHeader = ref<HTMLElement | null>(null)
onMounted(() => {
    if (!mainHeader.value) return

    if (import.meta.client && mainHeader.value) {
        ScrollTrigger.create({
            trigger: mainHeader.value,
            start: "top top",
            end: "+=80",
            scrub: true,
            onUpdate(self) {
                if (self.progress > 0 && !mainHeader.value?.classList.contains('scrolled')) {
                    mainHeader.value?.classList.add('scrolled');
                } else if (self.progress === 0 && mainHeader.value?.classList.contains('scrolled')) {
                    mainHeader.value?.classList.remove('scrolled');
                }
            },
        });
        const handleResize = () => {
            ScrollTrigger.update()
        }
        window.addEventListener('resize', handleResize)
        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize)
        })
    }
})
</script>

<template>
    <div id="header" class="">
        <header class="header">
            <div class="main-header" ref="mainHeader">
                <div class="container max-w-full">
                    <div class="right-side">
                        <NuxtLink to="/" class="logo" v-if="fullLogo">
                            <img :src="fullLogo" alt="Logo" />
                        </NuxtLink>
                    </div>
                    <div class="center-side">
                        <ClientOnly>
                            <ul class="list-links">
                                <li v-for="itemLink in appStore.header?.links" :key="itemLink.text">
                                    <NuxtLink :to="itemLink.link">{{ itemLink.text }}</NuxtLink>
                                    <ul class="sub-list" v-if="itemLink.subLinks?.length > 0">
                                        <li v-for="subItemLink in itemLink.subLinks" :key="subItemLink.text">
                                            <NuxtLink :to="subItemLink.link">{{ subItemLink.text }}</NuxtLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </ClientOnly>
                    </div>
                    <div class="left-side">
                        <button class="searchBTN base-btn" @click="showSearchModal">
                            <NuxtImg src="/img/search.svg" alt="search" />
                        </button>
                        <div class="split-line"></div>
                        <button class="languageBTN" @click="() => locale === 'ar' ? setLocale('en') : setLocale('ar')">
                            <span class="icon">
                                <img src="/img/language.svg" alt="language">
                            </span>
                            <span>
                                English
                            </span>
                        </button>
                        <div class="split-line"></div>
                        <button class="menuBTN base-btn" type="button" title="menu" @click="toggleNavbar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="mobile-menu" :class="`${isOpened && 'active'}`">
                <img src="/img/menu-close.svg" alt="Close menu" class="menu-close-icon" @click="closeNavbar">
                <ClientOnly>
                    <ul class="nav-items">
                        <li v-for="itemLink in appStore.header?.links" :key="itemLink.text" class="nav-item">
                            <NuxtLink :to="itemLink.link">{{ itemLink.text }}</NuxtLink>
                            <ul class="sub-list" v-if="itemLink.subLinks?.length > 0">
                                <li v-for="subItemLink in itemLink.subLinks" :key="subItemLink.text">
                                    <NuxtLink :to="subItemLink.link">{{ subItemLink.text }}</NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </ClientOnly>
            </div>
        </header>
    </div>

</template>
<style lang="scss">
#header {
    .header {
        .main-header {
            position: fixed;
            top: 26px;
            left: 50%;
            translate: -50% 0;
            width: calc(100% - 64px);
            z-index: 999;
            padding: 0 16px;
            transition: .3s all ease-in-out;

            .container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 24px;
                padding: 24px 32px 18px;
                border-bottom: 1px solid #FFFFFF3D;
                margin-inline: auto;

                .right-side {
                    width: auto;
                    height: 32px;
                    display: flex;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }

                .center-side {
                    .list-links {
                        display: flex;
                        align-items: center;
                        list-style: none;
                        gap: 40px;
                        padding: 0;
                        margin: 0;

                        @media (max-width:1600px) {
                            gap: 24px;
                        }

                        @media (max-width:1400px) {
                            gap: 16px;
                        }

                        @media (max-width:1200px) {
                            display: none;
                        }

                        a {
                            font-size: var(--header-links);
                            text-decoration: none;
                            color: #FFFFFF;
                            font-weight: 500;
                            transition: .3s all ease-in-out;

                            &:hover {
                                color: var(--light-blue);
                            }
                        }
                    }
                }

                .left-side {
                    display: flex;
                    align-items: center;
                    gap: 16px;

                    .split-line:last-of-type {
                        display: none;
                    }

                    @media (max-width:1200px) {
                        .split-line:last-of-type {
                            display: flex;
                        }
                    }

                    @media (max-width:778px) {
                        gap: 8px;
                    }

                    .searchBTN {
                        padding: 0;
                        height: 16px;
                        width: 16px;
                        display: flex;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        }
                    }

                    .menuBTN {
                        display: none;
                        padding: 0;
                        height: 18px;
                        width: 20px;
                        flex-direction: column;
                        justify-content: space-between;
                        cursor: pointer;

                        span {
                            height: 3px;
                            width: 100%;
                            background: #fff;
                            border-radius: 2px;
                            transition: transform 0.3s ease, background 0.3s ease;
                        }

                        &:hover span:nth-child(1) {
                            transform: translateX(4px);
                        }

                        &:hover span:nth-child(2) {
                            transform: translateX(-4px);
                        }

                        &:hover span:nth-child(3) {
                            transform: translateX(4px);
                        }

                        @media (max-width:1200px) {
                            display: flex;
                        }
                    }

                    .languageBTN {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: white;
                        text-decoration: none;
                        font-weight: 500;
                        transition: .3s all ease-in-out;
                        padding: 0;
                        background: none;
                        border: none;

                        &:hover {
                            color: var(--light-blue);
                        }
                    }
                }
            }

            @media (min-width: 1600px) {

                .container,
                .container-lg,
                .container-md,
                .container-sm,
                .container-xl,
                .container-xxl {
                    max-width: 1723px;
                    padding-inline: 32px;

                }
            }

            @media (max-width:778px) {
                padding: 0 12px;
                top: 0;
                width: calc(100% - 24px);

                .container {
                    padding: 16px 16px;
                }
            }

            &.scrolled {
                background: var(--mid-blue);
                box-shadow: 0 2px 12px 0 #00000026;
                transition: background 0.3s, box-shadow 0.3s;
                top: 0;

                .container {
                    padding: 16px 32px 16px;
                }

                @media (max-width: 778px) {
                    .container {
                        padding: 16px 16px;
                    }
                }
            }
        }

        .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            width: 320px;
            max-width: 100vw;
            height: 100vh;
            background: var(--dark-blue);
            z-index: 2000;
            flex-direction: column;
            box-shadow: -2px 0 12px rgba(0, 0, 0, 0.12);
            padding: 32px 20px 24px 20px;
            transition: transform .4s cubic-bezier(0.7, 0, 0.3, 1), opacity .3s;
            transform: translateX(100%);
            opacity: 0;

            &.active {
                display: flex;
                transform: translateX(0%);
                opacity: 1;
            }

            .menu-close-icon {
                width: 32px;
                height: 32px;
                align-self: flex-end;
                cursor: pointer;
                margin-bottom: 32px;
                transition: opacity .2s;
                filter: brightness(20);

                &:hover {
                    opacity: 0.7;
                }
            }

            .nav-items {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 4px;
                padding: 0;
                margin: 0;

                .nav-item {
                    a {
                        color: var(--white-2);
                        text-decoration: none;
                        font-size: var(--heading-5);
                        font-weight: 500;
                        padding: 8px 12px;
                        display: block;
                        border-radius: 4px;
                        transition: background .2s, color .2s;

                        &:hover,
                        &:focus {
                            background: var(--light-blue);
                            color: var(--mid-blue);
                        }
                    }

                    &.active a {
                        color: var(--yellow);
                        font-weight: 700;
                    }
                }
            }
        }

        @media (max-width: 1199px) {
            .mobile-menu {
                display: flex;
            }
        }

        @media (min-width: 1200px) {
            .mobile-menu {
                display: none !important;
            }
        }
    }


    &.inner-header {
        .header .main-header {
            background: var(--mid-blue);
        }

    }
}


#searchModal {}
</style>