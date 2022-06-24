import React, { useEffect, useState } from 'react'
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
	step: number
	message: string
}

interface StepFailed extends ScenarioPlayEvent {
	step: number
	status: string
	message: string
}

interface LogReceived extends ScenarioPlayEvent {
	simulatorName: string
	message: string
	isError: boolean
}

export enum StepState {
	PASSED = 'passed',
	FAILED = 'failed',
	UNKNOWN = 'unknown',
}

interface Log {
	timestamp: string
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

	const [stepStatus, setStepStatus] = useState<Record<number, StepState>>({})
	const [stepMessage, setStepMessage] = useState<Record<number, string>>({})
	const [logs, setLogs] = useState<Log[]>([])

	const playScenario = () => {
		const websocket = new WebSocket(
			`ws://${process.env.SERVER_URL}/api/environments/${environmentId}/scenarios/${scenarioId}`
		)

		websocket.onmessage = (message: MessageEvent<string>) => {
			const event = JSON.parse(message.data) as ScenarioPlayEvent

			if (event.type === ScenarioPlayEventType.STEP_PASSED) {
				const stepPassed = event as StepPassed
				console.log(
					`Step ${stepPassed.step} passed with message ${stepPassed.message}`
				)
				setStepStatus(stepStatus => ({
					...stepStatus,
					[stepPassed.step]: StepState.PASSED,
				}))
				setStepMessage(stepMessage => ({
					...stepMessage,
					[stepPassed.step]: JSON.parse(stepPassed.message).message,
				}))
			} else if (event.type === ScenarioPlayEventType.STEP_FAILED) {
				const stepFailed = event as StepFailed

				console.error(
					`Step ${stepFailed.step} failed with status ${stepFailed.status}: ${stepFailed.message}`
				)

				setStepStatus(stepStatus => ({
					...stepStatus,
					[stepFailed.step]: StepState.FAILED,
				}))
				setStepMessage(stepMessage => ({
					...stepMessage,
					[stepFailed.step]: JSON.parse(stepFailed.message).message,
				}))
			} else {
				const log = event as LogReceived

				if (log.isError) {
					console.error(`${log.simulatorName}: ${log.message}`)
				} else {
					console.log(`${log.simulatorName}: ${log.message}`)
				}

				const timestamp_index = log.message.indexOf(' ')

				setLogs(logs => [
					...logs,
					{
						timestamp: log.message.substring(0, timestamp_index),
						simulatorName: log.simulatorName,
						message: log.message.substring(timestamp_index),
						isError: log.isError,
					},
				])
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
								state={stepStatus[index + 1]}
								message={stepMessage[index + 1]}
							/>
						))}
					</div>
					{logs.map(log => (
						<p key={log.timestamp}>
							{log.simulatorName}: {log.timestamp} - {log.message}
						</p>
					))}
					<FloatingActionButton icon={<PlayIcon />} onClick={playScenario} />
				</>
			)}
		</>
	)
}

export default ViewScenarioInEnvironment
