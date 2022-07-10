import React, { useState } from 'react'
import RaisedButton from '../../../components/RaisedButton'
import TextInput from '../../../components/TextInput'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { queryClient, QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import AddIcon from '../../../components/Icons/AddIcon'

import * as classes from './CreateEnvironment.module.scss'

interface CreateEnvironmentFormErrors {
    name?: string
    description?: string
}

const CreateEnvironment: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [errors, setErrors] = useState<CreateEnvironmentFormErrors>({})
    const navigate = useNavigate()

    const { mutateAsync: createEnvironment, isLoading: isCreatingEnvironment } =
        useMutation(EnvironmentRepository.create, {
            onSuccess: () =>
                queryClient.invalidateQueries(QueryName.ENVIRONMENTS),
        })

    const validate = (
        name?: string,
        description?: string
    ): CreateEnvironmentFormErrors => {
        const errors: CreateEnvironmentFormErrors = {}

        if (name === undefined || name.trim().length === 0)
            errors.name = 'Please enter a name'

        if (description === undefined || description.trim().length === 0)
            errors.description = 'Please enter a description'

        return errors
    }

    const submit = () => {
        const errors = validate(name, description)

        if (Object.keys(errors).length > 0) setErrors(errors)
        else {
            createEnvironment({ name, description }).then(() => {
                toast('Environment created!', {
                    theme: 'dark',
                    type: 'success',
                })
                navigate(-1)
            })
        }
    }

    return (
        <div className={classes.wrapper}>
            <h1>Create environment</h1>
            <form>
                <TextInput
                    value={name}
                    onChange={setName}
                    label={'Name'}
                    error={errors.name}
                />
                <TextInput
                    value={description}
                    onChange={setDescription}
                    label={'Description'}
                    error={errors.description}
                />
            </form>
            <RaisedButton
                text={'Add environment'}
                icon={<AddIcon />}
                onClick={submit}
                disabled={isCreatingEnvironment}
            />
        </div>
    )
}

export default CreateEnvironment
