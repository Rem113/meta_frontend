import { BASE_URL, Environment, Execution, Simulator } from '..'

const baseUrl = `${BASE_URL}/environments`

export namespace EnvironmentRepository {
    export interface CreateEnvironmentParams {
        name: string
        description: string
    }

    export const all = async (): Promise<Environment[]> => {
        console.log('Querying environments...')
        const res = await fetch(baseUrl)
        return res.json()
    }

    export const create = async (
        params: CreateEnvironmentParams
    ): Promise<Environment> => {
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

    export const find = async (id: string): Promise<Environment> => {
        console.log(`Querying environment with id ${id}...`)
        const res = await fetch(`${baseUrl}/${id}`)
        return res.json()
    }

    export const simulatorsFor = async (id: string): Promise<Simulator[]> => {
        console.log(`Querying simulators for environment with id ${id}...`)
        const res = await fetch(`${baseUrl}/${id}/simulators`)
        return res.json()
    }

    export const executionsFor = async (
        environmentId: string,
        scenarioId: string
    ): Promise<Execution[]> => {
        console.log(
            `Querying executions for scenario with id ${scenarioId} in environment ${environmentId}...`
        )

        const res = await fetch(
            `${baseUrl}/${environmentId}/scenarios/${scenarioId}/executions`
        )

        return res.json()
    }

    export interface AddSimulatorParams {
        name: string
        environmentId: string
        imageId: string
        configuration: any
    }

    export const addSimulator = async (
        params: AddSimulatorParams
    ): Promise<Simulator> => {
        const body = JSON.stringify(params)
        const res = await fetch(
            `${baseUrl}/${params.environmentId}/simulators`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }
        )

        return res.json()
    }
}
