import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'

import FloatingActionButton from '../../../components/FloatingActionButton'
import PlayIcon from '../../../components/Icons/PlayIcon'
import ScenarioStep from './ScenarioStep'

import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import * as classes from './ViewScenarioInEnvironment.module.scss'

enum ScenarioPlayEventType {
	STEP_PASSED = 'StepPassed',
	STEP_FAILED = 'StepFailed',
	LOG = 'Log',
}

interface ScenarioPlayEvent {
	type: ScenarioPlayEventType
}

interface StepPassed extends ScenarioPlayEvent {
	message: string
}

interface StepFailed extends ScenarioPlayEvent {
	status: string
	message: string
}

interface LogReceived extends ScenarioPlayEvent {
	simulatorName: string
	message: string
	isError: boolean
}

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

	const playScenario = () => {
		const websocket = new WebSocket(
			`ws://${process.env.SERVER_URL}/api/environments/${environmentId}/scenarios/${scenarioId}`
		)

		let i = 1

		websocket.onmessage = (message: MessageEvent<string>) => {
			const event = JSON.parse(message.data) as ScenarioPlayEvent

			if (event.type === ScenarioPlayEventType.STEP_PASSED) {
				console.log(
					`Step ${i} passed with message ${(event as StepPassed).message}`
				)
				i += 1
			} else if (event.type === ScenarioPlayEventType.STEP_FAILED) {
				console.error(
					`Step ${i} failed with status ${(event as StepFailed).status}: ${
						(event as StepFailed).message
					}`
				)
				i += 1
			} else {
				const log = event as LogReceived

				console.log(event)

				if (log.isError) {
					console.error(`${log.simulatorName}: ${log.message}`)
				} else {
					console.log(`${log.simulatorName}: ${log.message}`)
				}
			}
		}
	}

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
					<FloatingActionButton icon={<PlayIcon />} onClick={playScenario} />
				</>
			)}
		</>
	)
}

export default ViewScenarioInEnvironment
