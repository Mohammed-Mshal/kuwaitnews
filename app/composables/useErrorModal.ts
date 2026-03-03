const isErrorModalOpen = ref(false)
const errorData = ref<Error | null>(null)

export function useErrorModal() {

    const showErrorModal = (error: any) => {
        isErrorModalOpen.value = true
        errorData.value = error
    }
    const hideError = () => {
        isErrorModalOpen.value = false
        errorData.value = null
    }

    return {
        isErrorModalOpen,
        errorData,
        showErrorModal,
        hideError
    }
}