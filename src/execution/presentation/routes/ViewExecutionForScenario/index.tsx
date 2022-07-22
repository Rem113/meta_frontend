import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Execution, QueryName } from '../../../../core/data'
import { ExecutionRepository } from '../../../data/ExecutionRepository'
import { ScenarioRepository } from '../../../../scenario/data/ScenarioRepository'
import {
    LogMessage,
    LogReceived,
    ScenarioPlayingEventType,
    StepFailed,
    StepPassed,
    StepState,
} from '../../../../scenario/data/scenario'
import Scenario from '../../../../scenario/presentation/components/Scenario'
import ScenarioLogs from '../../../../scenario/presentation/components/ScenarioLogs'

import * as classes from './ViewExecutionForScenario.module.scss'
import { useQuery } from 'react-query'

const ViewExecutionForScenario: React.FC = () => {
    const { environmentId, scenarioId, executionId } = useParams()

    const [stepStatus, setStepStatus] = useState<Record<number, StepState>>({})
    const [stepMessage, setStepMessage] = useState<Record<number, string>>({})
    const [logs, setLogs] = useState<LogMessage[]>([])

    const { data: scenario } = useQuery(
        [QueryName.SCENARIOS, environmentId!, scenarioId!],
        () => ScenarioRepository.find(scenarioId!)
    )

    const { data: execution } = useQuery(
        [QueryName.EXECUTIONS, executionId!],
        () => ExecutionRepository.find(executionId!),
        {
            onSuccess: (execution: Execution) => {
                const failedStatuses = execution.events
                    .filter(
                        event =>
                            event.type === ScenarioPlayingEventType.STEP_FAILED
                    )
                    .reduce(
                        (accumulator, event) => ({
                            ...accumulator,
                            [(event as StepFailed).step]: StepState.FAILED,
                        }),
                        {}
                    )

                const passedStatuses = execution.events
                    .filter(
                        event =>
                            event.type === ScenarioPlayingEventType.STEP_PASSED
                    )
                    .reduce(
                        (accumulator, event) => ({
                            ...accumulator,
                            [(event as StepPassed).step]: StepState.PASSED,
                        }),
                        {}
                    )

                setStepStatus({
                    ...stepStatus,
                    ...failedStatuses,
                    ...passedStatuses,
                })

                const stepMessages = execution.events
                    .filter(
                        event =>
                            event.type ===
                                ScenarioPlayingEventType.STEP_FAILED ||
                            event.type === ScenarioPlayingEventType.STEP_PASSED
                    )
                    .map(event => {
                        if (
                            event.type === ScenarioPlayingEventType.STEP_FAILED
                        ) {
                            const stepFailed = event as StepFailed
                            return {
                                message: stepFailed.message,
                                step: stepFailed.step,
                            }
                        } else {
                            const stepPassed = event as StepPassed
                            return {
                                message: stepPassed.message,
                                step: stepPassed.step,
                            }
                        }
                    })
                    .reduce(
                        (accumulator, current) => ({
                            ...accumulator,
                            [current.step]: current.message,
                        }),
                        {}
                    )

                setStepMessage({ ...stepMessage, ...stepMessages })

                const logs = execution.events
                    .filter(
                        event =>
                            event.type === ScenarioPlayingEventType.LOG_RECEIVED
                    )
                    .map(event => (event as LogReceived).logMessage)
                    .reduce(
                        (accumulator, logMessage) => [
                            ...accumulator,
                            logMessage,
                        ],
                        [] as LogMessage[]
                    )

                setLogs(logs)
            },
        }
    )

    return (
        <>
            <div className={classes.wrapper}>
                {scenario !== undefined && execution !== undefined && (
                    <>
                        <Scenario
                            environmentId={environmentId!}
                            scenario={scenario}
                            stepStatus={stepStatus}
                            stepMessage={stepMessage}
                        />
                        <div className={classes.info}>
                            <small>
                                Run on{' '}
                                <span>
                                    {new Date(
                                        execution.timestamp
                                    ).toLocaleDateString()}
                                </span>
                            </small>
                            <ScenarioLogs logs={logs} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ViewExecutionForScenario
