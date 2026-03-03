const isSearchModalOpen = ref(false)

export function useSearchModal() {

  const showSearchModal = (error: any) => {
    isSearchModalOpen.value = true
  }
  const hideSearch = () => {
    isSearchModalOpen.value = false
  }

  return {
    isSearchModalOpen,
    showSearchModal,
    hideSearch
  }
}