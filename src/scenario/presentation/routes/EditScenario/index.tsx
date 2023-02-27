import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { queryClient, QueryName, Scenario } from '../../../../core/data'
import { ImageRepository } from '../../../../image/data/ImageRepository'
import { ScenarioRepository } from '../../../data/ScenarioRepository'
import RaisedButton from '../../../../core/presentation/components/RaisedButton'
import TextInput from '../../../../core/presentation/components/TextInput'

import * as classes from './EditScenario.module.scss'
import StepForm from '../../components/StepForm'
import { Edit, Plus } from 'tabler-icons-react'
import * as Yup from "yup"
import validate from "../../../../core/presentation/utils/validate"

export interface StepData {
    step: number
    imageName: string
    imageVersion: string
    commandName: string
    commandDescription: string
    arguments: string
}

interface EditScenarioError {
    name?: string
    description?: string
}

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required")
    // steps: Yup.array()
})

const EditScenario: React.FC = () => {
    const { scenarioId } = useParams()

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [stepsData, setStepsData] = useState<StepData[]>([])
    const [errors, setErrors] = useState<EditScenarioError>({})

    const { data: images, isLoading: imagesLoading } = useQuery(
        QueryName.IMAGES,
        ImageRepository.all
    )

    const { data: scenario } = useQuery(
        [QueryName.SCENARIOS, scenarioId!],
        () => ScenarioRepository.find(scenarioId!),
        {
            enabled: !imagesLoading,
            onSuccess: (scenario: Scenario) => {
                setName(scenario.name)
                setDescription(scenario.description)
                setStepsData(
                    scenario.steps.map((step, index) => {
                        const image = images!.find(
                            image => image.id === step.imageId
                        )
                        return {
                            step: index,
                            imageName: image!.tag.name,
                            imageVersion: image!.tag.version,
                            commandName: step.command.name,
                            commandDescription: step.command.description,
                            arguments: JSON.stringify(step.arguments, null, 4),
                        }
                    })
                )
            },
        }
    )

    const { mutateAsync: updateScenario } = useMutation(
        ScenarioRepository.update,
        {
            onSuccess: () => queryClient.invalidateQueries(QueryName.SCENARIOS),
        }
    )

    const navigate = useNavigate()

    const set = (stepIndex: number, field: string) => (value: string) =>
        setStepsData(stepsData =>
            stepsData.map((step, index) =>
                index === stepIndex ? { ...step, [field]: value } : step
            )
        )

    const moveUp = (stepIndex: number) => () => {
        if (stepIndex === 0) return

        setStepsData(stepsData => [
            ...stepsData.slice(0, stepIndex - 1),
            {
                ...stepsData[stepIndex],
                step: stepIndex - 1,
            },
            {
                ...stepsData[stepIndex - 1],
                step: stepIndex,
            },
            ...stepsData.slice(stepIndex + 1),
        ])
    }

    const moveDown = (stepIndex: number) => () => {
        if (stepIndex === stepsData.length - 1) return

        setStepsData(stepsData => [
            ...stepsData.slice(0, stepIndex),
            {
                ...stepsData[stepIndex + 1],
                step: stepIndex,
            },
            {
                ...stepsData[stepIndex],
                step: stepIndex + 1,
            },
            ...stepsData.slice(stepIndex + 2),
        ])
    }

    const duplicate = (stepIndex: number) => () =>
        setStepsData(stepsData => [
            ...stepsData.slice(0, stepIndex),
            {
                ...stepsData[stepIndex],
                step: stepIndex,
            },
            ...stepsData.slice(stepIndex).map(stepData => ({
                ...stepData,
                step: stepData.step + 1,
            })),
        ])

    const remove = (stepIndex: number) => () => {
        if (stepsData.length === 1)
            toast('The last step cannot be removed', {
                type: 'warning',
                theme: 'dark',
            })
        else
            setStepsData(stepsData => [
                ...stepsData.slice(0, stepIndex),
                ...stepsData.slice(stepIndex + 1).map(stepData => ({
                    ...stepData,
                    step: stepData.step - 1,
                })),
            ])
    }

    const submit = async () => {
        const params = {
            id: scenario!.id,
            name,
            description,
            steps: stepsData.map(stepData => {
                const image = images?.find(
                    image =>
                        image.tag.name === stepData.imageName &&
                        image.tag.version === stepData.imageVersion
                )
                const command = image?.commands.find(
                    command => command.name === stepData.commandName
                )

                return {
                    imageId: image!.id,
                    command: {
                        name: command!.name,
                        description: stepData.commandDescription,
                        path: command!.path,
                    },
                    arguments: stepData.arguments ? JSON.parse(stepData.arguments) : {},
                }
            }),
        }

        const errors = await validate<EditScenarioError>(params, schema)

        if (errors !== null) {
            setErrors(errors)
        } else {
            setErrors({})

            updateScenario(params).then(() => {
                toast('Scenario updated!', {
                    theme: 'dark',
                    type: 'success',
                })
                navigate(-1)
            })
        }
    }

    return (
        <div className={classes.wrapper}>
            <h1>Edit scenario</h1>
            <form>
                <TextInput value={name} onChange={setName} label={'Name'} error={errors.name} />
                <TextInput
                    value={description}
                    onChange={setDescription}
                    label={'Description'}
                    error={errors.description}
                />
                {!imagesLoading && (
                    <>
                        <div className={classes.steps}>
                            {stepsData.map((step, index) => (
                                <StepForm
                                    key={index}
                                    stepData={step}
                                    setImageName={set(index, 'imageName')}
                                    setImageVersion={set(index, 'imageVersion')}
                                    setCommandName={set(index, 'commandName')}
                                    setCommandDescription={set(
                                        index,
                                        'commandDescription'
                                    )}
                                    setArguments={set(index, 'arguments')}
                                    moveUp={moveUp(index)}
                                    moveDown={moveDown(index)}
                                    duplicate={duplicate(index)}
                                    remove={remove(index)}
                                    images={images!}
                                />
                            ))}
                        </div>
                        <RaisedButton
                            className={classes['add-step']}
                            text={'Add step'}
                            color={'secondary'}
                            icon={<Plus size={'1rem'} />}
                            size={'small'}
                            onClick={() =>
                                setStepsData([
                                    ...stepsData,
                                    {
                                        step: stepsData.length,
                                        imageName: images![0].tag.name,
                                        imageVersion: images![0].tag.version,
                                        commandName:
                                            images![0].commands[0].name,
                                        commandDescription:
                                            images![0].commands[0].description,
                                        arguments: '',
                                    },
                                ])
                            }
                        />
                    </>
                )}
                <RaisedButton
                    className={classes['edit-scenario']}
                    text={'Edit scenario'}
                    icon={<Edit size="1.5rem" />}
                    onClick={submit}
                />
            </form>
        </div>
    )
}

export default EditScenario
