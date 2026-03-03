export const useApi = <T = any>(url: string, fetchOptions?: Parameters<ReturnType<typeof $fetch.create>>[1]) => {
  const { $api } = useNuxtApp()
  const api = $api as ReturnType<typeof $fetch.create>
  return api(url, fetchOptions) as Promise<T>
}
