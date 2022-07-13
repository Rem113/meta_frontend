import { BASE_URL } from '..'

const baseUrl = `${BASE_URL}/simulators`

export namespace SimulatorRepository {
    export interface UpdateSimulatorParams {
        simulatorId: string
        name: string
        port: number
        environmentId: string
        imageId: string
        configuration: any
    }

    export const update = async (params: UpdateSimulatorParams) => {
        const body = JSON.stringify(params)
        const res = await fetch(`${baseUrl}/${params.simulatorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })

        return res.json()
    }
}
