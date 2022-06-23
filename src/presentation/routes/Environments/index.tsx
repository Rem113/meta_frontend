import React from 'react'

import * as classes from './Environments.module.scss'
import { useQuery } from 'react-query'
import { QueryName } from '../../../data'
import { EnvironmentRepository } from '../../../data/repositories/EnvironmentRepository'
import FloatingActionButton from '../../components/FloatingActionButton'

import { useNavigate } from 'react-router-dom'
import AddIcon from '../../components/Icons/AddIcon'

const Environments: React.FC = () => {
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
		<>
			<h1 className={classes.title}>Environments</h1>
			<ul>
				{isFetching && <p>Loading...</p>}
				{environments &&
					environments.map(environment => (
						<li key={environment.id}>{environment.name}</li>
					))}
				{isError && error && <p>{error as string}</p>}
			</ul>
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/environments/create')}
			/>
		</>
	)
}

export default Environments
