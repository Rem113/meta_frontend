import React from 'react'

import * as classes from './ListEnvironments.module.scss'
import { QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import FloatingActionButton from '../../../components/FloatingActionButton'

import { useNavigate } from 'react-router-dom'
import AddIcon from '../../../components/Icons/AddIcon'
import EnvironmentCard from './EnvironmentCard'
import useQuery from '../../../../hooks/useQuery'

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
					An error has occurred while fetching environments. Please try again
					later.
				</p>
			)}
			<div className={classes.environments}>
				{environments &&
					environments.map(environment => (
						<EnvironmentCard key={environment.id} environment={environment} />
					))}
			</div>
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/environments/create')}
			/>
		</div>
	)
}

export default ListEnvironments
