import React from 'react'

import * as classes from './SimulatorForm.module.scss'
import { Image } from '../../../../data'
import CommandCard from './CommandCard'
import JSONInput from '../../../components/JSONInput'
import RaisedButton from '../../../components/RaisedButton'
import AddIcon from '../../../components/Icons/AddIcon'
import TextInput from '../../../components/TextInput'
import EditIcon from '../../../components/Icons/EditIcon'
import ImageVersions from '../../../components/ImageVersions'

interface SimulatorFormProps {
    images: Image[]
    simulatorName: string
    imageVersion: string
    configuration: string
    setSimulatorName: (value: string) => void
    setImageVersion: (value: string) => void
    setConfiguration: (value: string) => void
    addSimulator?: () => void
    updateSimulator?: () => void
}

const SimulatorForm: React.FC<SimulatorFormProps> = ({
    images,
    addSimulator,
    updateSimulator,
    simulatorName,
    imageVersion,
    configuration,
    setSimulatorName,
    setImageVersion,
    setConfiguration,
}) => {
    return (
        <div className={classes.wrapper}>
            <ImageVersions
                images={images}
                imageVersion={imageVersion}
                setImageVersion={setImageVersion}
            />
            <div>
                <h2>Commands</h2>
                <div className={classes.commands}>
                    {images
                        .find(image => image.tag.version === imageVersion)!
                        .commands.map(command => (
                            <CommandCard key={command.path} command={command} />
                        ))}
                </div>
            </div>
            <div className={classes.config}>
                <h2>Configuration</h2>
                <TextInput
                    value={simulatorName}
                    onChange={setSimulatorName}
                    label={'Name'}
                />
                <JSONInput
                    value={configuration}
                    onChange={setConfiguration}
                    label={'Configuration'}
                />
            </div>
            {addSimulator && (
                <RaisedButton
                    className={classes.button}
                    text={'Add simulator'}
                    icon={<AddIcon />}
                    onClick={addSimulator}
                />
            )}
            {updateSimulator && (
                <RaisedButton
                    className={classes.button}
                    text={'Update simulator'}
                    icon={<EditIcon />}
                    onClick={updateSimulator}
                />
            )}
        </div>
    )
}

export default SimulatorForm
