import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'

import FloatingActionButton from '../../../components/FloatingActionButton'

import * as classes from './ViewScenario.module.scss'
import ScenarioStep from './ScenarioStep'
import PlayIcon from '../../../components/Icons/PlayIcon'

const ViewScenario: React.FC = () => {
	const { id: scenarioId } = useParams()

	const {
		data: scenario,
		isLoading,
		isError,
		error,
	} = useQuery(
		[QueryName.SCENARIOS, scenarioId],
		() => ScenarioRepository.find(scenarioId!),
		{
			refetchOnWindowFocus: false,
		}
	)

	// const {
	// 	data: environment
	// } = useQuery([QueryName.ENVIRONMENTS, environmentId])

	return (
		<>
			{scenario !== undefined && (
				<>
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

export default ViewScenario
