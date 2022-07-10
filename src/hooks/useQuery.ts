import { useQuery as useReactQuery } from 'react-query'

const useQuery = <T>(queryName: string | string[], query: () => Promise<T>) =>
    useReactQuery(queryName, query, { refetchOnWindowFocus: false })

export default useQuery
