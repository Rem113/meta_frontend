import React from 'react'

import * as classes from './ConfigureImage.module.scss'
import { Environment, Image } from '../../../../../data'
import Chip from '../../../../components/Chip'
import TagIcon from '../../../../components/Icons/TagIcon'
import CommandCard from './CommandCard'
import JSONInput from '../../../../components/JSONInput'
import RaisedButton from '../../../../components/RaisedButton'
import AddIcon from '../../../../components/Icons/AddIcon'
import TextInput from '../../../../components/TextInput'

interface ConfigureImageProps {
    images: Image[]
    environment: Environment
    version: string
    name: string
    configuration: string
    setName: (value: string) => void
    setConfiguration: (value: string) => void
    setVersion: (value: string) => void
    addSimulator: () => void
}

const ConfigureImage: React.FC<ConfigureImageProps> = ({
    images,
    environment,
    addSimulator,
    version,
    name,
    configuration,
    setVersion,
    setName,
    setConfiguration,
}) => {
    return (
        <div className={classes.wrapper}>
            <h1>
                Add <strong>{images[0].tag.name}</strong> to{' '}
                <strong>{environment.name}</strong>
            </h1>
            <div className={classes['pick-version']}>
                <div className={classes.images}>
                    {images.map(image => (
                        <Chip
                            key={image.id}
                            selected={version === image.tag.version}
                            onClick={() => setVersion(image.tag.version)}
                            icon={<TagIcon className={classes.icon} />}
                            text={image.tag.version}
                        />
                    ))}
                </div>
                <h3 className={classes['image-description']}>
                    {
                        images.find(image => image.tag.version === version)!
                            .description
                    }
                </h3>
            </div>
            <div>
                <h2>Commands</h2>
                <div className={classes.commands}>
                    {images
                        .find(image => image.tag.version === version)!
                        .commands.map(command => (
                            <CommandCard key={command.path} command={command} />
                        ))}
                </div>
            </div>
            <div className={classes.config}>
                <h2>Configuration</h2>
                <TextInput value={name} onChange={setName} label={'Name'} />
                <JSONInput
                    value={configuration}
                    onChange={setConfiguration}
                    label={'Configuration'}
                />
            </div>
            <RaisedButton
                className={classes.button}
                text={'Add simulator'}
                icon={<AddIcon />}
                onClick={addSimulator}
            />
        </div>
    )
}

export default ConfigureImage
