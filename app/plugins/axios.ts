export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const API_BASE = config.public.apiBase
    const API_PREFIX = ''
    const baseURL = `${API_BASE}${API_PREFIX}`

    const rawApi: ReturnType<typeof $fetch.create> = $fetch.create({
        baseURL: baseURL,
        credentials: 'include',
        onRequest({ options }) {
            if (config.public.withCredentials) {
                const token = useCookie('token').value
                if (token) {
                    options.headers.set('Authorization', `Bearer ${token}`)
                }
            }
            if (options.body && options.body instanceof FormData) {
                options.headers.delete('Content-Type')
            }
        },
        onResponseError: ({ response }: { response: any }) => {
            if (import.meta.client && response.status !== 401) {
                try {
                    // In $fetch, error response data is typically in response._data
                    const errorData = (response as any)._data || (response as any).data || response

                    // Show error if it has the expected structure (type or errors array)
                    if (errorData && (errorData.type || (Array.isArray(errorData.errors) && errorData.errors.length > 0))) {
                        console.log(errorData)
                    } else if (errorData && typeof errorData === 'object') {
                        // If it's an object but doesn't match expected structure, try to show it anyway
                        console.log(errorData)
                    } else {
                        // Fallback for non-standard error formats
                        console.log({
                            type: 'error',
                            errors: [{ detail: response.statusText || 'An error occurred', attr: undefined }]
                        })
                    }
                } catch (e) {
                    // If parsing fails, show generic error
                    console.log({
                        type: 'error',
                        errors: [{ detail: 'An error occurred. Please try again.', attr: undefined }]
                    })
                }
            }
        }
    })
    const api = async (request: RequestInfo, options: any = {}) => {
        try {
            return await rawApi(request, options)
        } catch (error: any) {
            const status = error?.response?.status ?? error?.status
            if (status !== 401) {
                throw error
            }

        }
    }
    return {
        provide: {
            api
        }
    }
})
