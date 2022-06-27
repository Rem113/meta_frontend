import React, { useState } from 'react'
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
	SCENARIO_STARTING = 'ScenarioStarting',
	STEP_PASSED = 'StepPassed',
	STEP_FAILED = 'StepFailed',
	LOG_RECEIVED = 'LogReceived',
}

interface ScenarioPlayEvent {
	type: ScenarioPlayEventType
}

interface ScenarioStarting extends ScenarioPlayEvent {}

interface StepPassed extends ScenarioPlayEvent {
	step: number
	message: string
}

interface StepFailed extends ScenarioPlayEvent {
	step: number
	status: string
	message: string
}

interface LogMessage {
	simulatorName: string
	timestamp: string
	message: string
	isError: boolean
}

interface LogReceived extends ScenarioPlayEvent {
	logMessage: LogMessage
}

export enum StepState {
	PASSED = 'passed',
	FAILED = 'failed',
	RUNNING = 'running',
	UNKNOWN = 'unknown',
}

const usePlayScenario = (environmentId: string, scenarioId: string) => {
	const [stepStatus, setStepStatus] = useState<Record<number, StepState>>({})
	const [stepMessage, setStepMessage] = useState<Record<number, string>>({})
	const [logs, setLogs] = useState<LogMessage[]>([])
	const [isPlaying, setIsPlaying] = useState(false)

	const playScenario = () => {
		const websocket = new WebSocket(
			`ws://${process.env.SERVER_URL}/api/environments/${environmentId}/scenarios/${scenarioId}`
		)

		websocket.onopen = () => {
			setStepStatus({})
			setStepMessage({})
			setLogs([])
			setIsPlaying(true)
		}

		websocket.onmessage = (message: MessageEvent<string>) => {
			const event = JSON.parse(message.data) as ScenarioPlayEvent

			if (event.type === ScenarioPlayEventType.SCENARIO_STARTING) {
				setStepStatus(stepStatus => ({
					...stepStatus,
					1: StepState.RUNNING,
				}))
			} else if (event.type === ScenarioPlayEventType.STEP_PASSED) {
				const stepPassed = event as StepPassed
				setStepStatus(stepStatus => ({
					...stepStatus,
					[stepPassed.step]: StepState.PASSED,
					[stepPassed.step + 1]: StepState.RUNNING,
				}))
				setStepMessage(stepMessage => ({
					...stepMessage,
					[stepPassed.step]: stepPassed.message,
				}))
			} else if (event.type === ScenarioPlayEventType.STEP_FAILED) {
				const stepFailed = event as StepFailed

				setStepStatus(stepStatus => ({
					...stepStatus,
					[stepFailed.step]: StepState.FAILED,
				}))
				setStepMessage(stepMessage => ({
					...stepMessage,
					[stepFailed.step]: stepFailed.message,
				}))
			} else {
				const logMessage = (event as LogReceived).logMessage

				setLogs(logs => [logMessage, ...logs])
			}
		}

		websocket.onclose = () => {
			setIsPlaying(false)
		}
	}

	return { playScenario, stepStatus, stepMessage, logs, isPlaying }
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

	const { playScenario, stepStatus, stepMessage, logs, isPlaying } =
		usePlayScenario(environmentId!, scenarioId!)

	return (
		<>
			<div className={classes.wrapper}>
				{scenario !== undefined && (
					<>
						<div className={classes.scenario}>
							{environment !== undefined && (
								<strong className={classes.environment}>
									{environment.name}
								</strong>
							)}
							<h1>{scenario.name}</h1>
							<h3>{scenario.description}</h3>
							<div className={classes.steps}>
								{scenario.steps.map((step, index) => (
									<ScenarioStep
										key={step.imageId + index}
										number={index + 1}
										step={step}
										state={stepStatus[index + 1]}
										message={stepMessage[index + 1]}
									/>
								))}
							</div>
						</div>
						<div className={classes.logs}>
							{logs.map(log => (
								<p
									key={log.timestamp}
									className={log.isError ? classes.error : ''}
								>
									{log.simulatorName}: {log.timestamp} - {log.message}
								</p>
							))}
						</div>
					</>
				)}
			</div>
			<FloatingActionButton
				icon={<PlayIcon />}
				onClick={playScenario}
				disabled={isPlaying}
			/>
		</>
	)
}

export default ViewScenarioInEnvironment
