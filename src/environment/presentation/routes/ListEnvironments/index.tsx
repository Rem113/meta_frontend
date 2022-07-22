import React from 'react'

import * as classes from './ListEnvironments.module.scss'
import { QueryName } from '../../../../core/data'
import { EnvironmentRepository } from '../../../data/EnvironmentRepository'
import FloatingActionButton from '../../../../core/presentation/FloatingActionButton'

import { useNavigate } from 'react-router-dom'
import EnvironmentCard from '../../components/EnvironmentCard'
import { Plus } from 'tabler-icons-react'
import { useQuery } from 'react-query'

const ListEnvironments: React.FC = () => {
    const {
        data: environments,
        isFetching,
        isError,
    } = useQuery(QueryName.ENVIRONMENTS, EnvironmentRepository.all)

    const navigate = useNavigate()

    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>Environments</h1>
            {isFetching && <p>Loading...</p>}
            {isError && (
                <p>
                    An error has occurred while fetching environments. Please
                    try again later.
                </p>
            )}
            <div className={classes.environments}>
                {environments &&
                    environments.map(environment => (
                        <EnvironmentCard
                            key={environment.id}
                            environment={environment}
                        />
                    ))}
            </div>
            <FloatingActionButton
                icon={<Plus size={'1.5rem'} />}
                onClick={() => navigate('/environments/create')}
            />
        </div>
    )
}

export default ListEnvironments
