import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Execution } from '../../../../../../data'
import FailureIcon from '../../../../../components/Icons/FailureIcon'
import RightArrowIcon from '../../../../../components/Icons/RightArrowIcon'
import SuccessIcon from '../../../../../components/Icons/SuccessIcon'

import * as classes from './ExecutionSummary.module.scss'

interface ExecutionSummaryProps {
	execution: Execution
}

const ExecutionSummary: React.FC<ExecutionSummaryProps> = ({ execution }) => {
	const { environmentId, scenarioId } = useParams()

	const timestamp = new Date(execution.timestamp)

	return (
		<div className={classes.wrapper}>
			<div className={classes.info}>
				{execution.successful ? (
					<SuccessIcon className={classes['success-icon']} />
				) : (
					<FailureIcon className={classes['failure-icon']} />
				)}
				<p>{timestamp.toLocaleString()}</p>
			</div>
			<Link
				className={classes.details}
				to={`/environments/${environmentId}/scenarios/${scenarioId}/executions/${execution.id}`}
			>
				<p>Details</p>
				<RightArrowIcon className={classes.arrow} />
			</Link>
		</div>
	)
}

export default ExecutionSummary
