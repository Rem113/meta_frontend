export enum ScenarioPlayingEventType {
	SCENARIO_STARTING = 'ScenarioStarting',
	STEP_PASSED = 'StepPassed',
	STEP_FAILED = 'StepFailed',
	LOG_RECEIVED = 'LogReceived',
}

export interface ScenarioPlayingEvent {
	type: ScenarioPlayingEventType
}

export interface StepPassed extends ScenarioPlayingEvent {
	step: number
	message: string
}

export interface StepFailed extends ScenarioPlayingEvent {
	step: number
	status: string
	message: string
}

export interface LogMessage {
	simulatorName: string
	timestamp: string
	message: string
	isError: boolean
}

export interface LogReceived extends ScenarioPlayingEvent {
	logMessage: LogMessage
}

export enum StepState {
	PASSED = 'passed',
	FAILED = 'failed',
	RUNNING = 'running',
	UNKNOWN = 'unknown',
}