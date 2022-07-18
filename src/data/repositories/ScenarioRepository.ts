import { BASE_URL, Scenario } from '..'

const baseUrl = `${BASE_URL}/scenarios`

export namespace ScenarioRepository {
    export interface CreateScenarioParams {
        name: string
        description: string
        steps: ScenarioStepData[]
    }

    export interface ScenarioStepData {
        imageId: string
        command: ScenarioStepCommandData
        arguments: any
    }

    export interface ScenarioStepCommandData {
        name: string
        description: string
        path: string
    }

    export interface UpdateScenarioParams {
        id: string
        name: string
        description: string
        steps: ScenarioStepData[]
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

    export const create = async (
        params: CreateScenarioParams
    ): Promise<Scenario> => {
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

    export const update = async (
        params: UpdateScenarioParams
    ): Promise<Scenario> => {
        const body = JSON.stringify(params)
        const res = await fetch(`${baseUrl}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })

        return res.json()
    }

    export const remove = async (scenarioId: string): Promise<Scenario> => {
        const res = await fetch(`${baseUrl}/${scenarioId}`, {
            method: 'DELETE',
        })

        return res.json()
    }
}
