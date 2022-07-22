import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QueryName } from '../../../../core/data'
import { EnvironmentRepository } from '../../../../environment/data/EnvironmentRepository'
import SimulatorCard from '../../components/SimulatorCard'

import * as classes from './SimulatorsForEnvironment.module.scss'
import FloatingActionButton from '../../../../core/presentation/FloatingActionButton'
import { Plus } from 'tabler-icons-react'
import { useQuery } from 'react-query'

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
                            environmentId={environmentId!}
                        />
                    ))}
            </div>
            <FloatingActionButton
                icon={<Plus size={'1.5rem'} />}
                onClick={() =>
                    navigate(`/environments/${environmentId}/simulators/create`)
                }
            />
        </div>
    )
}

export default SimulatorsForEnvironment
