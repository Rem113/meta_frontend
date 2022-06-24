import React from 'react'
import { useQuery } from 'react-query'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'

import { useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'
import * as classes from './ListScenarios.module.scss'

const ListScenarios: React.FC = () => {
	const {
		data: scenarios,
		isLoading,
		isError,
		error,
	} = useQuery(QueryName.SCENARIOS, ScenarioRepository.all, {
		refetchOnWindowFocus: false,
	})

	const navigate = useNavigate()

	return (
		<div className={classes.wrapper}>
			<h1>Scenarios</h1>
			<div className={classes.scenarios}>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error}</p>}
				{scenarios !== undefined &&
					scenarios.map(scenario => (
						<Card
							key={scenario.id}
							name={scenario.name}
							description={scenario.description}
							onClick={() => navigate(`/scenarios/${scenario.id}`)}
						/>
					))}
			</div>
		</div>
	)
}

export default ListScenarios
