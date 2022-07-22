import { BASE_URL, Execution } from '../../core/data'

const baseUrl = `${BASE_URL}/executions`

export namespace ExecutionRepository {
    export const find = async (id: string): Promise<Execution> => {
        console.log(`Querying execution with id ${id}...`)
        const res = await fetch(`${baseUrl}/${id}`)
        return res.json()
    }
}
