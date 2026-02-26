import { ref, type Ref } from 'vue'

export interface UseFetchDataOptions<T> {
  initialData?: T
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useFetchData<T>(
  fetcher: () => Promise<T> | T,
  options: UseFetchDataOptions<T> = {}
) {
  const data: Ref<T | null> = ref(options.initialData ?? null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null
    
    try {
      const result = await fetcher()
      data.value = result
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error')
      error.value = errorObj
      options.onError?.(errorObj)
      throw errorObj
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}
