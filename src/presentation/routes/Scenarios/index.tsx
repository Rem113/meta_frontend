import React from 'react'
import { useQuery } from 'react-query'
import { QueryName } from '../../../data'
import { ScenarioRepository } from '../../../data/repositories/ScenarioRepository'

import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import * as classes from './Scenarios.module.scss'

const Scenarios: React.FC = () => {
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
		<>
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
		</>
	)
}

export default Scenarios
