import React from 'react'
import { useQuery } from 'react-query'
import { QueryName } from '../../../data'
import { ImageRepository } from '../../../data/repositories/ImageRepository'
import TextInput from '../../components/TextInput'

import * as classes from './Home.module.scss'

const Home: React.FC = () => {
	const { data: images, isFetching } = useQuery(
		QueryName.IMAGES,
		ImageRepository.all
	)

	const [name, setName] = React.useState<string>('')
	const [version, setVersion] = React.useState<string>('')
	const [commands, setCommands] = React.useState<string>('')
	const [file, setFile] = React.useState<File | null>(null)

	const change =
		(callback: (string) => void) =>
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			callback(e.target.value)
		}

	const fileUploaded = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFile(e.target.files[0])
	}

	const submit = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault()

		const createImageParams = {
			file,
			data: {
				name,
				version,
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
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<ul>
					{images.map(image => (
						<li key={`${image.name}:${image.version}`}>
							{image.name}: {image.version}
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default Home
