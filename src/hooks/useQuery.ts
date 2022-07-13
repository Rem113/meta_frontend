import { useQuery as useReactQuery, UseQueryOptions } from 'react-query'

const useQuery = <T>(
    queryName: string | string[],
    query: () => Promise<T>,
    options?:
        | Omit<
              UseQueryOptions<T, unknown, T, string | string[]>,
              'queryKey' | 'queryFn'
          >
        | undefined
) =>
    useReactQuery(queryName, query, { refetchOnWindowFocus: false, ...options })

export default useQuery
