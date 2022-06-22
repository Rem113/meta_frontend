import { QueryClient } from 'react-query'

export const BASE_URL = 'http://127.0.0.1:4000/api'

export const queryClient = new QueryClient()

export enum QueryName {
	ENVIRONMENTS = 'ENVIRONMENTS',
	IMAGES = 'IMAGES',
}

export interface Environment {
	id: string
	name: string
}

export interface Tag {
	name: string
	version: string
}

export interface Image {
	tag: Tag
	commands: JSON
}
