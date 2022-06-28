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
import ClockIcon from '../../../components/Icons/ClockIcon'

enum ScenarioPlayEventType {
	SCENARIO_STARTING = 'ScenarioStarting',
	STEP_PASSED = 'StepPassed',
	STEP_FAILED = 'StepFailed',
	LOG_RECEIVED = 'LogReceived',
}

interface ScenarioPlayEvent {
	type: ScenarioPlayEventType
}

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

const pad = (number: number) => (number < 10 ? `0${number}` : number)

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
							<h1>Logs</h1>
							{logs.map((log, index) => {
								const timestamp = new Date(log.timestamp)
								return (
									<div key={log.simulatorName + index} className={classes.log}>
										<p className={classes.timestamp}>
											<ClockIcon className={classes['timestamp-icon']} />
											<span>{`${pad(timestamp.getHours())}:${pad(
												timestamp.getMinutes()
											)}:${pad(timestamp.getSeconds())}`}</span>
										</p>
										<p className={classes['simulator-name']}>
											{log.simulatorName}
										</p>
										<p
											className={`${log.isError ? classes.error : ''} ${
												classes.message
											}`}
										>
											{log.message}
										</p>
									</div>
								)
							})}
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
