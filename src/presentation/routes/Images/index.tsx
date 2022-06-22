import React from 'react'
import { useQuery } from 'react-query'
import { QueryName } from '../../../data'
import { ImageRepository } from '../../../data/repositories/ImageRepository'
import TextInput from '../../components/TextInput'

import * as classes from './Images.module.scss'

const Images: React.FC = () => {
	const {
		data: images,
		isFetching,
		isError,
		error,
	} = useQuery(QueryName.IMAGES, ImageRepository.all, {
		refetchOnWindowFocus: false,
	})

	const [name, setName] = React.useState<string>('')
	const [version, setVersion] = React.useState<string>('')
	const [commands, setCommands] = React.useState<string>('')
	const [file, setFile] = React.useState<File | null>(null)

	const change =
		(callback: (value: string) => void) =>
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			callback(e.target.value)
		}

	const fileUploaded = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = e.currentTarget.files

		if (files !== null) setFile(files[0])
	}

	const isValid = (
		name: string,
		version: string,
		_: string,
		file: File | null
	): boolean => {
		if (name.trim().length === 0) return false
		if (version.trim().length === 0) return false
		return file !== null;
	}

	const submit = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault()

		if (!isValid(name, version, commands, file)) {
			alert('Invalid input')
			return
		}

		const createImageParams = {
			file: file!,
			data: {
				tag: {
					name,
					version,
				},
				commands: JSON.parse(commands),
			},
		}

		await ImageRepository.create(createImageParams)
	}

	return (
		<>
			<h1 className={classes.h1}>Add an image</h1>
			<form onSubmit={submit}>
				<TextInput value={name} onChange={change(setName)} placeholder='Name' />
				<TextInput
					value={version}
					onChange={change(setVersion)}
					placeholder='Version'
				/>
				<TextInput
					value={commands}
					onChange={change(setCommands)}
					placeholder='Commands'
				/>
				<div>
					<input type='file' name='image' id='image' onChange={fileUploaded} />
				</div>
				<div>
					<input type='submit' value='Add' />
				</div>
			</form>
			<br />
			<h1 className={classes.h1}>Images</h1>
			{isFetching && <p>Loading...</p>}
			{isError && error !== null && error !== undefined && (
				<p>
					There was an error while fetching the images from the server:{' '}
					{error as string}
				</p>
			)}
			{images !== undefined && (
				<ul>
					{images.map(image => (
						<li key={`${image.tag.name}:${image.tag.version}`}>
							{image.tag.name}: {image.tag.version}
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default Images
