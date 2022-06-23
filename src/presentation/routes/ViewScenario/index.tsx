import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../data'
import { ScenarioRepository } from '../../../data/repositories/ScenarioRepository'

const ViewScenario: React.FC = () => {
	const { id: scenarioId } = useParams()

	const {
		data: scenario,
		isLoading,
		isError,
		error,
	} = useQuery(
		QueryName.SCENARIOS,
		() => ScenarioRepository.find(scenarioId!),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<>
			{scenario !== undefined && (
				<>
					<h1>{scenario.name}</h1>
					<h3>{scenario.description}</h3>
					{scenario.steps.map(step => (
						<>
							<p>{step.simulatorId}</p>
							<p>{step.command.name}</p>
							<p>{step.command.description}</p>
							<p>{step.command.path}</p>
							<p>{JSON.stringify(step.arguments)}</p>
						</>
					))}
				</>
			)}
		</>
	)
}

export default ViewScenario
