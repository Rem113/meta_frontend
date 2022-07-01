import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'
import useQuery from '../../../../hooks/useQuery'
import Card from '../../../components/Card'

import * as classes from './ScenariosForEnvironment.module.scss'

const ScenariosForEnvironment: React.FC = () => {
	const { environmentId } = useParams()

	const { data: environment } = useQuery(
		[QueryName.ENVIRONMENTS, environmentId!],
		() => EnvironmentRepository.find(environmentId!)
	)

	const { data: scenarios } = useQuery(
		QueryName.SCENARIOS,
		ScenarioRepository.all
	)

	const navigate = useNavigate()

	return (
		<div className={classes.wrapper}>
			{environment !== undefined && (
				<h1>
					Scenarios for environment <strong>{environment.name}</strong>
				</h1>
			)}
			<div className={classes.scenarios}>
				{scenarios !== undefined &&
					scenarios.map(scenario => (
						<Card
							key={scenario.id}
							name={scenario.name}
							description={scenario.description}
							onClick={() =>
								navigate(
									`/environments/${environmentId}/scenarios/${scenario.id}`
								)
							}
						/>
					))}
			</div>
		</div>
	)
}

export default ScenariosForEnvironment
