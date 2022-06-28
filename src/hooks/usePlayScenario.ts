import { useState } from 'react'
import {
	LogMessage,
	LogReceived,
	ScenarioPlayingEvent,
	ScenarioPlayingEventType,
	StepFailed,
	StepPassed,
	StepState,
} from '../data/scenario'

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
			const event = JSON.parse(message.data) as ScenarioPlayingEvent

			if (event.type === ScenarioPlayingEventType.SCENARIO_STARTING) {
				setStepStatus(stepStatus => ({
					...stepStatus,
					1: StepState.RUNNING,
				}))
			} else if (event.type === ScenarioPlayingEventType.STEP_PASSED) {
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
			} else if (event.type === ScenarioPlayingEventType.STEP_FAILED) {
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

export default usePlayScenario
