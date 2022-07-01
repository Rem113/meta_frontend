import React from 'react'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import SimulatorCard from './SimulatorCard'

import * as classes from './SimilatorsForEnvironment.module.scss'
import useQuery from '../../../../hooks/useQuery'

const SimilatorsForEnvironment: React.FC = () => {
	const { environmentId } = useParams()

	const { data: environment } = useQuery(
		[QueryName.ENVIRONMENTS, environmentId!],
		() => EnvironmentRepository.find(environmentId!)
	)

	const { data: simulators } = useQuery(
		[QueryName.SIMULATORS, environmentId!],
		() => EnvironmentRepository.simulatorsFor(environmentId!)
	)

	return (
		<div className={classes.wrapper}>
			{environment !== undefined && (
				<h1>
					Similators for environment <strong>{environment.name}</strong>
				</h1>
			)}
			<div className={classes.simulators}>
				{simulators !== undefined &&
					simulators.map(simulator => (
						<SimulatorCard key={simulator.id} simulator={simulator} />
					))}
			</div>
		</div>
	)
}

export default SimilatorsForEnvironment
