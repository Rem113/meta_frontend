import { BASE_URL, Environment } from '..'

const baseUrl = `${BASE_URL}/environments`

export interface CreateEnvironmentParams {
    name: string
}

export namespace EnvironmentRepository {
    export const all = async (): Promise<Environment[]> => {
        console.log('Querying environments...')
        const res = await fetch(baseUrl)
        return res.json()
    }

    export const create = async (params: CreateEnvironmentParams): Promise<Environment> => {
        const body = JSON.stringify(params)
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body,
        })

        return res.json()
    }
}
