import React, { useState } from 'react'
import TextInput from '../../../../core/presentation/TextInput'
import { useMutation } from 'react-query'
import { ImageRepository } from '../../../data/ImageRepository'
import { queryClient, QueryName } from '../../../../core/data'
import RaisedButton from '../../../../core/presentation/RaisedButton'

import { toast } from 'react-toastify'
import FileInput from '../../../../core/presentation/FileInput'
import { useNavigate } from 'react-router-dom'

import * as classes from './CreateImage.module.scss'
import JSONInput from '../../../../core/presentation/JSONInput'
import { Plus } from 'tabler-icons-react'

interface CreateImageFormErrors {
    name?: string
    version?: string
    description?: string
    command?: string
    file?: string
}

const CreateImage: React.FC = () => {
    const { mutateAsync: createImage, isLoading: isCreatingImage } =
        useMutation(ImageRepository.create, {
            onSuccess: () => queryClient.invalidateQueries(QueryName.IMAGES),
        })

    const [name, setName] = useState<string>('')
    const [version, setVersion] = useState<string>('')
    const [description, setDescription] = useState<string>('')
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
        if (description.trim().length === 0)
            errors.description = 'Please enter a description'
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
                    description,
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
                    value={description}
                    onChange={setDescription}
                    label={'Description'}
                    error={errors.description}
                />
                <JSONInput
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
                icon={<Plus size={'1.5rem'} />}
                onClick={submit}
                disabled={isCreatingImage}
            />
        </>
    )
}

export default CreateImage
