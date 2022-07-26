import { BASE_URL, Environment } from '../../core/data'

export interface CreateEnvironmentParams {
    name: string
    description: string
}

export default {
    create: async (params: CreateEnvironmentParams): Promise<Environment> => {
        const body = JSON.stringify(params)
        const response = await fetch(`${BASE_URL}/environments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })

        const responseBody = await response.json()

        if (response.status === 201) return responseBody

        throw new Error(
            `Server error (${response.status}): ${responseBody.message}`
        )
    },
}
