import React, { useState } from 'react'

import { QueryName, Step } from '../../../../core/data'
import { ImageRepository } from '../../../../image/data/ImageRepository'

import * as classes from './ScenarioStep.module.scss'
import { StepState } from '../../../data/scenario'
import Highlight from '../../../../core/presentation/components/Highlight'
import { Tag, Track } from 'tabler-icons-react'
import { useQuery } from 'react-query'

interface ScenarioStepProps {
    number: number
    step: Step
    state?: StepState
    message?: string
}

const ScenarioStep: React.FC<ScenarioStepProps> = ({
    number,
    step,
    state = StepState.UNKNOWN,
    message,
}) => {
    const {
        data: image,
        isLoading,
        isError,
        error,
    } = useQuery([QueryName.IMAGES, step.imageId], () =>
        ImageRepository.find(step.imageId)
    )

    const [showArguments, setShowArguments] = useState(false)

    const toggleShowArguments = () =>
        setShowArguments(showArguments => !showArguments)

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <h2 className={`${classes.number} ${classes[state]}`}>
                    {number}
                </h2>
                <div className={classes.info}>
                    {isLoading && <p>Loading...</p>}
                    {isError && error !== undefined && (
                        <p>Error while getting image name: {error}</p>
                    )}
                    {image !== undefined && (
                        <div className={classes.image}>
                            <h3>{image.tag.name}</h3>
                            <div className={classes['image-info']}>
                                <div className={classes['icon-wrapper']}>
                                    <Tag className={classes.icon} />
                                    <p>{image.tag.version}</p>
                                </div>
                                <div className={classes['icon-wrapper']}>
                                    <Track className={classes.icon} />
                                    <p>/{step.command.path}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={classes.command}>
                        <p>{step.command.name}</p>
                        <small>{step.command.description}</small>
                    </div>
                </div>
            </div>
            <div className={classes.arguments}>
                <p onClick={toggleShowArguments}>
                    {showArguments ? 'Hide' : 'Show'} arguments
                </p>
                <Highlight
                    className={`json ${classes.json} ${
                        showArguments ? '' : classes.hidden
                    }`}
                    value={JSON.stringify(step.arguments, null, 4)}
                />
            </div>
            {/* {message && (
				<p className={`${classes.message} ${classes[state]}`}>
					Returned: {JSON.stringify(message)}
				</p>
			)} */}
        </div>
    )
}

export default ScenarioStep
