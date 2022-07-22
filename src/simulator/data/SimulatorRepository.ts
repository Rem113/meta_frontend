import { BASE_URL, queryClient, QueryName, Simulator } from '../../core/data'

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

    export const update = async (
        params: UpdateSimulatorParams
    ): Promise<Simulator> => {
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

    export const remove = async (simulatorId: string): Promise<Simulator> => {
        const res = await fetch(`${baseUrl}/${simulatorId}`, {
            method: 'DELETE',
        })

        queryClient.invalidateQueries(QueryName.SIMULATORS)

        return res.json()
    }
}
