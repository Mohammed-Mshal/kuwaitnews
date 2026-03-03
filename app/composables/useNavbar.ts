const isOpened = ref(false)
export function useNavbar() {
    const toggleNavbar = () => {
        isOpened.value = !isOpened.value
    }
    const closeNavbar = () => {
        isOpened.value = false
    }
    return {
        isOpened,
        toggleNavbar,
        closeNavbar
    }
}