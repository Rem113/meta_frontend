import { QueryClient } from 'react-query'

export const BASE_URL = 'http://127.0.0.1:4000/api'

export const queryClient = new QueryClient()

export enum QueryName {
	ENVIRONMENTS = 'ENVIRONMENTS',
	IMAGES = 'IMAGES',
	SCENARIOS = 'SCENARIOS',
	SIMULATORS = 'SIMULATORS',
}

export interface Command {
	name: string
	description: string
	path: string
}

export interface Step {
	imageId: string
	command: Command
	arguments: string
}

export interface Scenario {
	id: string
	name: string
	description: string
	steps: Step[]
}

export interface Environment {
	id: string
	name: string
	description: string
}

export interface Tag {
	name: string
	version: string
}

export interface Command {
	name: string
	description: string
	path: string
}

export interface Image {
	tag: Tag
	commands: Command[]
}

export interface Simulator {
	id: string
	name: string
	imageId: string
	configuration: Record<string, string>
}