import React, {useState} from 'react'
import TextInput from "../../components/TextInput";
import RaisedButton from "../../components/RaisedButton";

import add from "../../../assets/icons/add.svg"
import {EnvironmentRepository} from "../../../data/repositories/EnvironmentRepository";
import {useMutation} from "react-query";
import {queryClient, QueryName} from "../../../data";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


interface CreateEnvironmentFormErrors {
    name?: string
}

const CreateEnvironment: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [errors, setErrors] = useState<CreateEnvironmentFormErrors>({})
    const navigate = useNavigate()

    const {
        mutateAsync: createEnvironment,
        isLoading: isCreatingEnvironment,
        isError: failedCreatingEnvironment,
        isSuccess: successfullyCreatedEnvironment,
        error: createEnvironmentError
    } = useMutation(EnvironmentRepository.create, {
        onSuccess: () => queryClient.invalidateQueries(QueryName.ENVIRONMENTS)
    })

    const validate = (name?: string): CreateEnvironmentFormErrors => {
        const errors: CreateEnvironmentFormErrors = {}

        if (name === undefined || name.trim().length === 0) errors.name = "Please enter a name";

        return errors
    }

    const submit = () => {
        const errors = validate(name)

        if (Object.keys(errors).length > 0) setErrors(errors)
        else {
            createEnvironment({name}).then(() => {
                toast("Environment created!", {
                    theme: "dark",
                    type: "success"
                })
                navigate(-1)
            })
        }
    }

    return <>
        <h1>Create environment</h1>
        <form>
            <TextInput value={name} onChange={e => setName(e.currentTarget.value)} label={"Name"} error={errors.name}/>
            <RaisedButton text={"Add environment"} icon={add} alt={"add"} onClick={submit}
                          disabled={isCreatingEnvironment}/>
        </form>
    </>
}

export default CreateEnvironment