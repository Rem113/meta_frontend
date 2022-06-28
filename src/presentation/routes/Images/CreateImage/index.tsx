import React, { useState } from 'react'
import TextInput from '../../../components/TextInput'
import { useMutation } from 'react-query'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'
import { queryClient, QueryName } from '../../../../data'
import RaisedButton from '../../../components/RaisedButton'

import { toast } from 'react-toastify'
import FileInput from '../../../components/FileInput'
import { useNavigate } from 'react-router-dom'
import AddIcon from '../../../components/Icons/AddIcon'

import * as classes from './CreateImage.module.scss'

interface CreateImageFormErrors {
	name?: string
	version?: string
	command?: string
	file?: string
}

const CreateImage: React.FC = () => {
	const {
		mutateAsync: createImage,
		isLoading: isCreatingImage,
		isError: failedCreatingImage,
		isSuccess: successfullyCreatedImage,
		error: createImageError,
	} = useMutation(ImageRepository.create, {
		onSuccess: () => queryClient.invalidateQueries(QueryName.IMAGES),
	})

	const [name, setName] = useState<string>('')
	const [version, setVersion] = useState<string>('')
	const [commands, setCommands] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)
	const [errors, setErrors] = useState<CreateImageFormErrors>({})

	const navigate = useNavigate()

	const validate = (
		name: string,
		version: string,
		command: string,
		file: File | null
	): CreateImageFormErrors => {
		const errors: CreateImageFormErrors = {}

		if (name.trim().length === 0) errors.name = 'Please enter a name'
		if (version.trim().length === 0)
			errors.version = 'Please enter a version number'
		// TODO: Validate command schema
		if (file === null) errors.file = 'Please select a file'

		return errors
	}

	const submit = async () => {
		const errors = validate(name, version, commands, file)

		if (Object.keys(errors).length > 0) setErrors(errors)
		else {
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

			try {
				await createImage(createImageParams)
				toast(() => 'Image created!', {
					theme: 'dark',
					type: 'success',
				})
				navigate(-1)
			} catch (error) {
				toast(() => 'Failed to create an image: ' + error, {
					theme: 'dark',
					type: 'error',
				})
			}
		}
	}

	return (
		<>
			<h1 className={classes.title}>Add an image</h1>
			<form onSubmit={submit}>
				<TextInput
					value={name}
					onChange={setName}
					label={'Name'}
					error={errors.name}
				/>
				<TextInput
					value={version}
					onChange={setVersion}
					label={'Version'}
					error={errors.version}
				/>
				<TextInput
					value={commands}
					onChange={setCommands}
					label={'Commands'}
					error={errors.command}
				/>
				<FileInput
					label={'Image'}
					file={file}
					onFileSelected={setFile}
					error={errors.file}
				/>
			</form>
			<RaisedButton
				text={'Add image'}
				icon={<AddIcon />}
				onClick={submit}
				disabled={isCreatingImage}
			/>
		</>
	)
}

export default CreateImage
