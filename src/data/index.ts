import { QueryClient } from 'react-query'
import { ScenarioPlayingEvent } from './scenario'

export const BASE_URL = `http://${process.env.SERVER_URL}/api`

export const queryClient = new QueryClient()

export enum QueryName {
	ENVIRONMENTS = 'ENVIRONMENTS',
	EXECUTIONS = 'EXECUTIONS',
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
	arguments: object
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
	id: string
	tag: Tag
	commands: Command[]
}

export interface Simulator {
	id: string
	name: string
	port: number
	imageId: string
	configuration: Record<string, string>
}

export interface Execution {
	id: string
	timestamp: string,
    events: ScenarioPlayingEvent[],
    successful: boolean,
}