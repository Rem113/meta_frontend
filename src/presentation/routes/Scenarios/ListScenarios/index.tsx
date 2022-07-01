import React from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'
import useQuery from '../../../../hooks/useQuery'
import Card from '../../../components/Card'
import FloatingActionButton from '../../../components/FloatingActionButton'
import AddIcon from '../../../components/Icons/AddIcon'

import * as classes from './ListScenarios.module.scss'

const ListScenarios: React.FC = () => {
	const { data: scenarios, isLoading } = useQuery(
		QueryName.SCENARIOS,
		ScenarioRepository.all
	)

	const navigate = useNavigate()

	return (
		<div className={classes.wrapper}>
			<h1>Scenarios</h1>
			{isLoading && <p>Loading...</p>}
			<div className={classes.scenarios}>
				{scenarios !== undefined &&
					scenarios.map(scenario => (
						<Card
							key={scenario.id}
							name={scenario.name}
							description={scenario.description}
						/>
					))}
			</div>
			<FloatingActionButton
				icon={<AddIcon />}
				onClick={() => navigate('/scenarios/create')}
			/>
		</div>
	)
}

export default ListScenarios
