import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QueryName } from '../../../../data'
import { ScenarioRepository } from '../../../../data/repositories/ScenarioRepository'

import FloatingActionButton from '../../../components/FloatingActionButton'
import PlayIcon from '../../../components/Icons/PlayIcon'

import * as classes from './ViewScenarioInEnvironment.module.scss'
import ClockIcon from '../../../components/Icons/ClockIcon'
import Scenario from './Scenario'
import usePlayScenario from '../../../../hooks/usePlayScenario'

const pad = (number: number) => (number < 10 ? `0${number}` : number)

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
						<div className={classes.logs}>
							<h1>Logs</h1>
							{logs.map((log, index) => {
								const timestamp = new Date(log.timestamp)
								return (
									<div key={log.simulatorName + index} className={classes.log}>
										<p className={classes.timestamp}>
											<ClockIcon className={classes['timestamp-icon']} />
											<span>{`${pad(timestamp.getHours())}:${pad(
												timestamp.getMinutes()
											)}:${pad(timestamp.getSeconds())}`}</span>
										</p>
										<p className={classes['simulator-name']}>
											{log.simulatorName}
										</p>
										<p
											className={`${log.isError ? classes.error : ''} ${
												classes.message
											}`}
										>
											{log.message}
										</p>
									</div>
								)
							})}
						</div>
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
