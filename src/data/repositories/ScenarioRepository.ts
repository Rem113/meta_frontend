import { BASE_URL, Scenario } from '..'

const baseUrl = `${BASE_URL}/scenarios`


export namespace ScenarioRepository {
	export interface CreateScenarioParams {
		name: string
		description: string
		steps: CreateScenarioStepData[]
	}

	export interface CreateScenarioStepData {
		imageId: string
		command: CreateScenarioStepCommandData
		arguments: any
	}

	export interface CreateScenarioStepCommandData {
		name: string
		description: string
		path: string
	}

	export const all = async (): Promise<Scenario[]> => {
		console.log('Querying scenarios...')
		const res = await fetch(baseUrl)
		return res.json()
	}

	export const find = async (id: string): Promise<Scenario> => {
		console.log(`Querying for scenario with id ${id}...`)
		const res = await fetch(`${baseUrl}/${id}`)
		return res.json()
	}

	export const create = async (params: CreateScenarioParams): Promise<Scenario> => {
		const body = JSON.stringify(params)
		const res = await fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		})

		return res.json()
	}
}
