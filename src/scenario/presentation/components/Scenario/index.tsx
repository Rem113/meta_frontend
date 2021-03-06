import React from 'react'
import { QueryName, Scenario } from '../../../../core/data'
import { EnvironmentRepository } from '../../../../environment/data/EnvironmentRepository'
import { StepState } from '../../../data/scenario'
import ScenarioStep from '../ScenarioStep'

import * as classes from './Scenario.module.scss'
import { useQuery } from 'react-query'

interface ScenarioProps {
    environmentId: string
    scenario: Scenario
    stepStatus: Record<number, StepState>
    stepMessage: Record<number, string>
}

const Scenario: React.FC<ScenarioProps> = ({
    environmentId,
    scenario,
    stepStatus,
    stepMessage,
}) => {
    const { data: environment } = useQuery(
        [QueryName.ENVIRONMENTS, environmentId],
        () => EnvironmentRepository.find(environmentId)
    )

    return (
        <div>
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
    )
}

export default Scenario
