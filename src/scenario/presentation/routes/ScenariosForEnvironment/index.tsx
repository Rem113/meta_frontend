import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QueryName } from '../../../../core/data'
import { EnvironmentRepository } from '../../../../environment/data/EnvironmentRepository'
import { ScenarioRepository } from '../../../data/ScenarioRepository'
import Card from '../../../../core/presentation/components/Card'

import * as classes from './ScenariosForEnvironment.module.scss'
import { useQuery } from 'react-query'

const ScenariosForEnvironment: React.FC = () => {
    const { environmentId } = useParams()

    const { data: environment } = useQuery(
        [QueryName.ENVIRONMENTS, environmentId!],
        () => EnvironmentRepository.find(environmentId!)
    )

    const { data: scenarios } = useQuery(
        QueryName.SCENARIOS,
        ScenarioRepository.all
    )

    const navigate = useNavigate()

    return (
        <div className={classes.wrapper}>
            {environment !== undefined && (
                <h1>
                    Scenarios for environment{' '}
                    <strong>{environment.name}</strong>
                </h1>
            )}
            <div className={classes.scenarios}>
                {scenarios !== undefined &&
                    scenarios.map(scenario => (
                        <Card
                            key={scenario.id}
                            name={scenario.name}
                            description={scenario.description}
                            onClick={() =>
                                navigate(
                                    `/environments/${environmentId}/scenarios/${scenario.id}`
                                )
                            }
                        />
                    ))}
            </div>
        </div>
    )
}

export default ScenariosForEnvironment
