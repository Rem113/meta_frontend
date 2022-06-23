import React from 'react'
import ScenarioCard from '../../components/ScenarioCard'
import { useQuery } from 'react-query'
import { QueryName } from '../../../data'
import { ScenarioRepository } from '../../../data/repositories/ScenarioRepository'

import * as classes from './Scenarios.module.scss'
import { useNavigate } from 'react-router-dom'

const Scenarios: React.FC = () => {
	const {
		data: scenarios,
		isLoading,
		isError,
		error,
	} = useQuery(QueryName.SCENARIOS, ScenarioRepository.all)

	const navigate = useNavigate()

	return (
		<>
			<h1>Scenarios</h1>
			<div className={classes.scenarios}>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error}</p>}
				{scenarios !== undefined &&
					scenarios.map(scenario => (
						<ScenarioCard
							scenario={scenario}
							onClick={() => navigate(`/scenarios/${scenario.id}`)}
						/>
					))}
			</div>
		</>
	)
}

export default Scenarios
