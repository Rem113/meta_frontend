import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { queryClient, QueryName } from '../../../../core/data'
import { ImageRepository } from '../../../../image/data/ImageRepository'
import { ScenarioRepository } from '../../../data/ScenarioRepository'
import RaisedButton from '../../../../core/presentation/RaisedButton'
import TextInput from '../../../../core/presentation/TextInput'

import * as classes from './CreateScenario.module.scss'
import StepForm from '../../components/StepForm'
import { Plus } from 'tabler-icons-react'

export interface StepData {
    step: number
    imageName: string
    imageVersion: string
    commandName: string
    commandDescription: string
    arguments: string
}

const CreateScenario: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [stepsData, setStepsData] = useState<StepData[]>([])

    const { data: images } = useQuery(QueryName.IMAGES, ImageRepository.all)

    const { mutateAsync: createScenario } = useMutation(
        ScenarioRepository.create,
        {
            onSuccess: () => queryClient.invalidateQueries(QueryName.SCENARIOS),
        }
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (images !== undefined) {
            setStepsData([
                {
                    step: 0,
                    imageName: images[0].tag.name,
                    imageVersion: images[0].tag.version,
                    commandName: images[0].commands[0].name,
                    commandDescription: images[0].commands[0].description,
                    arguments: '',
                },
            ])
        }
    }, [images])

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
        // TODO: Validate
        let createScenarioParams = {
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
                    arguments: JSON.parse(stepData.arguments),
                }
            }),
        }

        createScenario(createScenarioParams).then(() => {
            toast('Scenario created!', {
                theme: 'dark',
                type: 'success',
            })
            navigate(-1)
        })
    }

    return (
        <div className={classes.wrapper}>
            <h1>Add a scenario</h1>
            <form>
                <TextInput value={name} onChange={setName} label={'Name'} />
                <TextInput
                    value={description}
                    onChange={setDescription}
                    label={'Description'}
                />
                {images !== undefined && (
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
                                    images={images}
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
                                        imageName: images[0].tag.name,
                                        imageVersion: images[0].tag.version,
                                        commandName: images[0].commands[0].name,
                                        commandDescription:
                                            images[0].commands[0].description,
                                        arguments: '',
                                    },
                                ])
                            }
                        />
                    </>
                )}
                <RaisedButton
                    className={classes['add-scenario']}
                    text={'Add scenario'}
                    icon={<Plus size={'1.5rem'} />}
                    onClick={submit}
                />
            </form>
        </div>
    )
}

export default CreateScenario
