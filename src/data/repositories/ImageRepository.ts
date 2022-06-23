import { BASE_URL, Image } from '..'

const baseUrl = `${BASE_URL}/images`

export interface CreateImageParams {
	file: File
	data: Image
}

export namespace ImageRepository {
	export const all = async (): Promise<Image[]> => {
		console.log('Querying images...')
		const res = await fetch(baseUrl)
		return res.json()
	}

	export const create = async (params: CreateImageParams): Promise<Image> => {
		const formData = new FormData()
		formData.append('image', params.file)
		formData.append('image_data', JSON.stringify(params.data))

		const res = await fetch(baseUrl, {
			method: 'POST',
			body: formData,
		})

		return res.json()
	}

	export const find = async (id: string): Promise<Image> => {
		console.log(`Querying for image with id ${id}...`)
		const res = await fetch(`${baseUrl}/${id}`)
		return res.json()
	}
}
