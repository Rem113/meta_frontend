import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'

import FloatingActionButton from '../../../components/FloatingActionButton'
import ScenarioStep from './ScenarioStep'
import PlayIcon from '../../../components/Icons/PlayIcon'

import * as classes from './ViewScenarioInEnvironment.module.scss'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'

const ViewScenarioInEnvironment: React.FC = () => {
	const { environmentId, scenarioId } = useParams()

	const { data: environment } = useQuery(
		[QueryName.ENVIRONMENTS, environmentId],
		() => EnvironmentRepository.find(environmentId!),
		{ refetchOnWindowFocus: false }
	)

	const { data: scenario } = useQuery(
		[QueryName.SCENARIOS, scenarioId],
		() => ScenarioRepository.find(scenarioId!),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<>
			{scenario !== undefined && (
				<>
					{environment !== undefined && (
						<strong className={classes.environment}>{environment.name}</strong>
					)}
					<h1>{scenario.name}</h1>
					<h3>{scenario.description}</h3>
					<div className={classes.wrapper}>
						{scenario.steps.map((step, index) => (
							<ScenarioStep
								key={step.imageId + index}
								number={index + 1}
								step={step}
							/>
						))}
					</div>
					<FloatingActionButton icon={<PlayIcon />} onClick={() => {}} />
				</>
			)}
		</>
	)
}

export default ViewScenarioInEnvironment
