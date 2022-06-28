import React from 'react'
import { Link } from 'react-router-dom'
import { Execution } from '../../../../../../data'
import FailureIcon from '../../../../../components/Icons/FailureIcon'
import RightArrowIcon from '../../../../../components/Icons/RightArrowIcon'
import SuccessIcon from '../../../../../components/Icons/SuccessIcon'

import * as classes from './ExecutionSummary.module.scss'

interface ExecutionSummaryProps {
	execution: Execution
}

const ExecutionSummary: React.FC<ExecutionSummaryProps> = ({ execution }) => {
	let timestamp = new Date(execution.timestamp)

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
			<Link className={classes.details} to={'/'}>
				<p>Details</p>
				<RightArrowIcon className={classes.arrow} />
			</Link>
		</div>
	)
}

export default ExecutionSummary
