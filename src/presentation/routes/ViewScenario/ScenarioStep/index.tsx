import React from 'react'
import { useQuery } from 'react-query'
import { QueryName, Step } from '../../../../data'
import { ImageRepository } from '../../../../data/repositories/ImageRepository'

import * as classes from './ScenarioStep.module.scss'

import tag from '../../../../assets/icons/tag.svg'
import globe from '../../../../assets/icons/globe.svg'
import GlobeIcon from '../../../components/Icons/GlobeIcon'
import TagIcon from '../../../components/Icons/TagIcon'

interface ScenarioStepProps {
	number: number
	step: Step
}

const ScenarioStep: React.FC<ScenarioStepProps> = ({ number, step }) => {
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
	return (
		<div className={classes.wrapper}>
			<h2 className={classes.number}>{number}</h2>
			<div className={classes.info}>
				{isLoading && <p>Loading...</p>}
				{isError && error !== undefined && (
					<p>Error while getting image name: {error}</p>
				)}
				{image !== undefined && (
					<div className={classes.image}>
						<h3>{image.tag.name}</h3>
						<div className={classes["image-info"]}>
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
					<p>{step.command.description}</p>
				</div>
				<a className={classes.parameters}>Expand parameters</a>
			</div>
		</div>
	)
}

export default ScenarioStep
