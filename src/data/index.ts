import { QueryClient } from 'react-query'

export const BASE_URL = 'http://127.0.0.1:4000/api'

export const queryClient = new QueryClient()

export enum QueryName {
	IMAGES = 'IMAGES',
}

export interface Image {
	name: string
	version: string
	commands: JSON
}
