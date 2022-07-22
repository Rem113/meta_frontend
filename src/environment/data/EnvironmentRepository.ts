import { BASE_URL, Environment, Execution, Simulator } from '../../core/data'

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
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })

        if (response.status === 201) return response.json()
        else {
            const message = await response.json().then(json => json.message)
            throw new Error('Failed to create environment: ' + message)
        }
    }

    export const find = async (id: string): Promise<Environment> => {
        console.log(`Querying environment with id ${id}...`)
        const res = await fetch(`${baseUrl}/${id}`)
        return res.json()
    }

    export const simulatorsFor = async (
        environmentId: string
    ): Promise<Simulator[]> => {
        console.log(
            `Querying simulators for environment with id ${environmentId}...`
        )
        const res = await fetch(`${baseUrl}/${environmentId}/simulators`)
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

    export const findSimulatorInEnvironment = async (
        environmentId: string,
        simulatorId: string
    ): Promise<Simulator> => {
        console.log(
            `Querying simulator with id ${simulatorId} in environment ${environmentId}...`
        )
        const res = await fetch(
            `${baseUrl}/${environmentId}/simulators/${simulatorId}`
        )
        return res.json()
    }
}
