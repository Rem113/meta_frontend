import React, { useState } from 'react'
import TextInput from '../../../../core/presentation/components/TextInput'
import { useMutation } from 'react-query'
import { ImageRepository } from '../../../data/ImageRepository'
import { queryClient, QueryName } from '../../../../core/data'
import RaisedButton from '../../../../core/presentation/components/RaisedButton'
import * as Yup from 'yup'

import { toast } from 'react-toastify'
import FileInput from '../../../../core/presentation/components/FileInput'
import { useNavigate } from 'react-router-dom'

import * as classes from './CreateImage.module.scss'
import JSONInput from '../../../../core/presentation/components/JSONInput'
import { Plus } from 'tabler-icons-react'
import validate from '../../../../core/presentation/utils/validate'
import commandsValidator from './commandsValidator'

interface CreateImageError {
    name?: string
    version?: string
    description?: string
    commands?: string
    file?: string
}

const validateCommands = (commands: string | undefined): boolean => {
    const isValid = commandsValidator(commands)
    console.log(commandsValidator.errors)
    return isValid
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    version: Yup.string()
        .matches(
            /^[0-9]+.[0-9]+.[0-9]+$/,
            "Version must be in the format 'x.x.x'"
        )
        .required('Version is required'),
    description: Yup.string().required('Description is required'),
    commands: Yup.string()
        .test('Commands', 'Invalid JSON schema', validateCommands)
        .required('Commands is required'),
    file: Yup.mixed().required('File is required'),
})

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
    const [errors, setErrors] = useState<CreateImageError>({})

    const navigate = useNavigate()

    const handleChange =
        (name: string, setter: (value: any) => void) => (value: any) => {
            setter(value)
            setErrors(errors => ({
                ...errors,
                [name]: undefined,
            }))
        }

    const submit = async () => {
        const params = { name, version, description, commands, file }
        const errors = await validate<CreateImageError>(params, schema)

        if (errors !== null) {
            setErrors(errors)
        } else {
            setErrors({})

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
                navigate(`/images`)
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
                    onChange={handleChange('name', setName)}
                    label={'Name'}
                    error={errors.name}
                />
                <TextInput
                    value={version}
                    onChange={handleChange('version', setVersion)}
                    label={'Version'}
                    error={errors.version}
                />
                <TextInput
                    value={description}
                    onChange={handleChange('description', setDescription)}
                    label={'Description'}
                    error={errors.description}
                />
                <JSONInput
                    value={commands}
                    onChange={handleChange('commands', setCommands)}
                    label={'Commands'}
                    error={errors.commands}
                />
                <FileInput
                    label={'Image'}
                    file={file}
                    onFileSelected={handleChange('file', setFile)}
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
