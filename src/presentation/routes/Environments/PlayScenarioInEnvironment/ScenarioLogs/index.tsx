import React from 'react'
import { LogMessage } from '../../../../../data/scenario'
import ClockIcon from '../../../../components/Icons/ClockIcon'

import * as classes from './ScenarioLogs.module.scss'

const pad = (number: number) => (number < 10 ? `0${number}` : number)

interface ScenarioLogsProps {
	logs: LogMessage[]
}

const ScenarioLogs: React.FC<ScenarioLogsProps> = ({ logs }) => {
	return (
		<div className={classes.wrapper}>
			<h1>Logs</h1>
			{logs.length === 0 && <p>No logs for now.</p>}
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
						<p className={classes['simulator-name']}>{log.simulatorName}</p>
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
	)
}

export default ScenarioLogs
