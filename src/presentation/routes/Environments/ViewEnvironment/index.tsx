import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { EnvironmentRepository } from '../../../../data/repositories/EnvironmentRepository'
import SimulatorCard from './SimulatorCard'

import * as classes from "./ViewEnvironment.module.scss"

const ViewEnvironment: React.FC = () => {
	const { id: environmentId } = useParams()

	const { data: environment } = useQuery(
		[QueryName.ENVIRONMENTS, environmentId],
		() => EnvironmentRepository.find(environmentId!),
		{ refetchOnWindowFocus: false }
	)

	const { data: simulators } = useQuery(
		[QueryName.SIMULATORS, environmentId],
		() => EnvironmentRepository.simulatorsFor(environmentId!),
		{ refetchOnWindowFocus: false }
	)

	return (
		<>
			{environment !== undefined && <h1>{environment.name}</h1>}
			<div className={classes.simulators}>
				{simulators !== undefined &&
					simulators.map(simulator => (
						<SimulatorCard key={simulator.id} simulator={simulator} />
					))}
			</div>
		</>
	)
}

export default ViewEnvironment
