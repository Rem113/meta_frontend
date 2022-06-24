import React from 'react'

import * as classes from './ListEnvironments.module.scss'
import { useQuery } from 'react-query'
import { QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import FloatingActionButton from '../../../components/FloatingActionButton'

import { useNavigate } from 'react-router-dom'
import AddIcon from '../../../components/Icons/AddIcon'
import Card from '../../../components/Card'
import EnvironmentCard from './EnvironmentCard'

const ListEnvironments: React.FC = () => {
	const {
		data: environments,
		isFetching,
		isError,
		error,
	} = useQuery(QueryName.ENVIRONMENTS, EnvironmentRepository.all, {
		refetchOnWindowFocus: false,
	})

	const navigate = useNavigate()

	return (
		<div className={classes.wrapper}>
			<h1 className={classes.title}>Environments</h1>
			{isFetching && <p>Loading...</p>}
			<div className={classes.environments}>
				{environments &&
					environments.map(environment => (
						<EnvironmentCard key={environment.id} environment={environment} />
					))}
			</div>
			{isError && error && <p>{error as string}</p>}
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/environments/create')}
			/>
		</div>
	)
}

export default ListEnvironments
