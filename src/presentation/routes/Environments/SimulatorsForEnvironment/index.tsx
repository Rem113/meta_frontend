import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import SimulatorCard from './SimulatorCard'

import * as classes from './SimulatorsForEnvironment.module.scss'
import useQuery from '../../../../hooks/useQuery'
import FloatingActionButton from '../../../components/FloatingActionButton'
import AddIcon from '../../../components/Icons/AddIcon'

const SimulatorsForEnvironment: React.FC = () => {
    const { environmentId } = useParams()

    const { data: environment } = useQuery(
        [QueryName.ENVIRONMENTS, environmentId!],
        () => EnvironmentRepository.find(environmentId!)
    )

    const { data: simulators } = useQuery(
        [QueryName.SIMULATORS, environmentId!],
        () => EnvironmentRepository.simulatorsFor(environmentId!)
    )

    const navigate = useNavigate()

    return (
        <div className={classes.wrapper}>
            {environment !== undefined && (
                <h1>
                    Simulators for environment{' '}
                    <strong>{environment.name}</strong>
                </h1>
            )}
            <div className={classes.simulators}>
                {simulators !== undefined &&
                    simulators.map(simulator => (
                        <SimulatorCard
                            key={simulator.id}
                            simulator={simulator}
                        />
                    ))}
            </div>
            <FloatingActionButton
                icon={<AddIcon />}
                onClick={() =>
                    navigate(`/environments/${environmentId}/simulators/create`)
                }
            />
        </div>
    )
}

export default SimulatorsForEnvironment
