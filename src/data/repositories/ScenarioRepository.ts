import { BASE_URL, Scenario } from '..'

const baseUrl = `${BASE_URL}/scenarios`

export namespace ScenarioRepository {
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
}
