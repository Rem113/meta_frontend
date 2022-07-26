import React, { useEffect } from 'react'
import { StepData } from '../../routes/EditScenario'

import { Image } from '../../../../core/data'
import JSONInput from '../../../../core/presentation/components/JSONInput'
import SelectInput from '../../../../core/presentation/components/SelectInput'
import TextInput from '../../../../core/presentation/components/TextInput'

import * as classes from './StepForm.module.scss'
import dedupeImages from '../../../../image/utils/dedupeImages'
import { ArrowDown, ArrowUp, Copy, Trash } from 'tabler-icons-react'

interface StepFormProps {
    stepData: StepData
    setImageName: (imageName: string) => void
    setImageVersion: (imageVersion: string) => void
    setCommandName: (commandName: string) => void
    setCommandDescription: (commandDescription: string) => void
    setArguments: (args: string) => void
    moveUp: () => void
    moveDown: () => void
    duplicate: () => void
    remove: () => void
    images: Image[]
}

const StepForm: React.FC<StepFormProps> = ({
    stepData,
    setImageName,
    setImageVersion,
    setCommandName,
    setCommandDescription,
    setArguments,
    moveUp,
    moveDown,
    duplicate,
    remove,
    images,
}) => {
    useEffect(() => {
        const imageVersion = images.find(
            image => image.tag.name === stepData.imageName
        )!.tag.version
        const commandName = images.find(
            image =>
                image.tag.name === stepData.imageName &&
                image.tag.version === stepData.imageVersion
        )!.commands[0].name
        const commandDescription = images.find(
            image =>
                image.tag.name === stepData.imageName &&
                image.tag.version === stepData.imageVersion
        )!.commands[0].description

        setImageVersion(imageVersion)
        setCommandName(commandName)
        setCommandDescription(commandDescription)
    }, [stepData.imageName])

    useEffect(() => {
        const commandName = images.find(
            image =>
                image.tag.name === stepData.imageName &&
                image.tag.version === stepData.imageVersion
        )!.commands[0].name
        const commandDescription = images.find(
            image =>
                image.tag.name === stepData.imageName &&
                image.tag.version === stepData.imageVersion
        )!.commands[0].description

        setCommandName(commandName)
        setCommandDescription(commandDescription)
    }, [stepData.imageVersion])

    useEffect(() => {
        const commandDescription = images.find(
            image =>
                image.tag.name === stepData.imageName &&
                image.tag.version === stepData.imageVersion
        )!.commands[0].description

        setCommandDescription(commandDescription)
    }, [stepData.commandName])

    return (
        <div className={classes.wrapper}>
            <div className={classes.controls}>
                <Copy className={classes.copy} onClick={duplicate} />
                <ArrowUp className={classes['move-up']} onClick={moveUp} />
                <p className={classes.step}>#{stepData.step + 1}</p>
                <ArrowDown
                    className={classes['move-down']}
                    onClick={moveDown}
                />
                <Trash className={classes.delete} onClick={remove} />
            </div>
            <div className={classes.inputs}>
                <div className={classes['first-row']}>
                    <SelectInput
                        label={'Image name'}
                        value={stepData.imageName}
                        onChange={setImageName}
                        options={dedupeImages(images).map(
                            image => image.tag.name
                        )}
                    />
                    <SelectInput
                        label={'Image version'}
                        value={stepData.imageVersion}
                        onChange={setImageVersion}
                        options={images
                            .filter(
                                image => image.tag.name === stepData.imageName
                            )
                            .map(image => image.tag.version)}
                    />
                    <SelectInput
                        label={'Command name'}
                        value={stepData.commandName}
                        onChange={setCommandName}
                        options={images
                            .find(
                                image =>
                                    image.tag.name === stepData.imageName &&
                                    image.tag.version === stepData.imageVersion
                            )!
                            .commands.map(command => command.name)}
                    />
                </div>
                <div>
                    <TextInput
                        value={stepData.commandDescription}
                        onChange={setCommandDescription}
                        label={'Description'}
                    />
                </div>
                <div>
                    <JSONInput
                        value={stepData.arguments}
                        onChange={setArguments}
                        label={'Arguments'}
                    />
                </div>
            </div>
        </div>
    )
}

export default StepForm
