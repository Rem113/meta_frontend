import React from 'react'
import { QueryName } from '../../../../../data'
import { EnvironmentRepository } from '../../../../../data/repositories/EnvironmentRepository'
import useQuery from '../../../../../hooks/useQuery'
import ExecutionSummary from './ExecutionSummary'

import * as classes from './ScenarioExecutions.module.scss'

interface ScenarioExecutionsProps {
    environmentId: string
    scenarioId: string
}

const ScenarioExecutions: React.FC<ScenarioExecutionsProps> = ({
    environmentId,
    scenarioId,
}) => {
    const { data: executions } = useQuery(
        [QueryName.EXECUTIONS, environmentId, scenarioId],
        () => EnvironmentRepository.executionsFor(environmentId, scenarioId)
    )

    const successfulExecutions =
        executions !== undefined
            ? executions.reverse().filter(execution => execution.successful)
            : []
    const lastSuccessfulExecutionText =
        successfulExecutions.length > 0
            ? `Last succeded on ${new Date(
                  successfulExecutions[
                      successfulExecutions.length - 1
                  ].timestamp
              ).toLocaleDateString()}`
            : 'No successful execution'

    return (
        <div className={classes.wrapper}>
            <h1>Executions</h1>
            <p className={classes.last}>{lastSuccessfulExecutionText}</p>
            {executions !== undefined && executions.length === 0 && (
                <p>No executions found.</p>
            )}
            <div className={classes.executions}>
                {executions !== undefined &&
                    executions
                        .reverse()
                        .map(execution => (
                            <ExecutionSummary
                                key={execution.timestamp}
                                execution={execution}
                            />
                        ))}
            </div>
        </div>
    )
}

export default ScenarioExecutions
