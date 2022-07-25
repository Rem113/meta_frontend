import React, { useState } from 'react'
import RaisedButton from '../../../../core/presentation/RaisedButton'
import TextInput from '../../../../core/presentation/TextInput'
import * as Yup from 'yup'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { queryClient, QueryName } from '../../../../core/data'

import * as classes from './CreateEnvironment.module.scss'
import { Plus } from 'tabler-icons-react'

import environmentRepository, {
    CreateEnvironmentParams,
} from '../../../data/environmentRepository'

interface CreateEnvironmentError {
    name?: string
    description?: string
}

const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
})

const CreateEnvironment: React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<CreateEnvironmentError>({})
    const navigate = useNavigate()

    const handleChange =
        (name: string, setter: (value: string) => void) => (value: string) => {
            setter(value)
            setErrors(errors => ({
                ...errors,
                [name]: undefined,
            }))
        }

    const { mutateAsync: createEnvironment, isLoading: isCreatingEnvironment } =
        useMutation(environmentRepository.create, {
            onSuccess: environment => {
                queryClient.invalidateQueries(QueryName.ENVIRONMENTS)
                toast('Environment created!', {
                    theme: 'dark',
                    type: 'success',
                })
                navigate(`/environments`)
            },
        })

    const validate = async (
        params: CreateEnvironmentParams
    ): Promise<boolean> => {
        try {
            await schema.validate(params, { abortEarly: false })
            return true
        } catch (error: any) {
            setErrors(
                error.inner.reduce(
                    (
                        accumulator: CreateEnvironmentError,
                        { path, message }: { path: string; message: string }
                    ) => ({
                        ...accumulator,
                        [path]: message,
                    }),
                    {}
                )
            )
            return false
        }
    }

    const submit = async () => {
        const params = { name, description }
        const isValid = await validate(params)

        if (!isValid) return

        setErrors({})

        createEnvironment(params).catch(error =>
            toast(error.message, {
                theme: 'dark',
                type: 'error',
            })
        )
    }

    return (
        <div className={classes.wrapper}>
            <h1>Create environment</h1>
            <form>
                <TextInput
                    value={name}
                    onChange={handleChange('name', setName)}
                    label={'Name'}
                    error={errors.name}
                />
                <TextInput
                    value={description}
                    onChange={handleChange('description', setDescription)}
                    label={'Description'}
                    error={errors.description}
                />
            </form>
            <RaisedButton
                text={'Add environment'}
                icon={<Plus size="1.5rem" />}
                onClick={submit}
                disabled={isCreatingEnvironment}
            />
        </div>
    )
}

export default CreateEnvironment
