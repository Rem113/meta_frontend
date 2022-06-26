import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Highlight from 'react-highlight'

import { QueryName, Step } from '../../../../../data'
import { ImageRepository } from '../../../../../data/repositories/ImageRepository'

import * as classes from './ScenarioStep.module.scss'

import GlobeIcon from '../../../../components/Icons/GlobeIcon'
import TagIcon from '../../../../components/Icons/TagIcon'
import { StepState } from '..'

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
	} = useQuery(
		[QueryName.IMAGES, step.imageId],
		() => ImageRepository.find(step.imageId),
		{ refetchOnWindowFocus: false }
	)

	const [showArguments, setShowArguments] = useState(false)

	const toggleShowArguments = () =>
		setShowArguments(showArguments => !showArguments)

	return (
		<div className={classes.wrapper}>
			<div className={classes.inner}>
				<h2 className={`${classes.number} ${classes[state]}`}>{number}</h2>
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
									<TagIcon className={classes.icon} />
									<p>{image.tag.version}</p>
								</div>
								<div className={classes['icon-wrapper']}>
									<GlobeIcon className={classes.icon} />
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
				<Highlight className={`json ${showArguments ? '' : classes.hidden}`}>
					{JSON.stringify(step.arguments, null, 4)}
				</Highlight>
			</div>
			{message && (
				<p className={`${classes.message} ${classes[state]}`}>
					Returned: {JSON.stringify(message)}
				</p>
			)}
		</div>
	)
}

export default ScenarioStep
