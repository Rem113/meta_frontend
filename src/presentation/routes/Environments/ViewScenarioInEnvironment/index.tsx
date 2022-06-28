import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'

import FloatingActionButton from '../../../components/FloatingActionButton'
import PlayIcon from '../../../components/Icons/PlayIcon'

import Scenario from './Scenario'
import usePlayScenario from '../../../../hooks/usePlayScenario'
import ScenarioLogs from './ScenarioLogs'

import * as classes from './ViewScenarioInEnvironment.module.scss'

const ViewScenarioInEnvironment: React.FC = () => {
	const { environmentId, scenarioId } = useParams()

	const { data: scenario } = useQuery(
		[QueryName.SCENARIOS, scenarioId],
		() => ScenarioRepository.find(scenarioId!),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { playScenario, stepStatus, stepMessage, logs, isPlaying } =
		usePlayScenario(environmentId!, scenarioId!)

	return (
		<>
			<div className={classes.wrapper}>
				{scenario !== undefined && (
					<>
						<Scenario
							environmentId={environmentId!}
							scenario={scenario}
							stepStatus={stepStatus}
							stepMessage={stepMessage}
						/>
						<ScenarioLogs logs={logs} />
					</>
				)}
			</div>
			<FloatingActionButton
				icon={<PlayIcon />}
				onClick={playScenario}
				disabled={isPlaying}
			/>
		</>
	)
}

export default ViewScenarioInEnvironment
