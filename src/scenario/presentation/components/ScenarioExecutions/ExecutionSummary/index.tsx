import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Execution } from '../../../../../core/data'

import * as classes from './ExecutionSummary.module.scss'
import { ArrowRight, CircleCheck, CircleX } from 'tabler-icons-react'

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
                    <CircleCheck
                        className={classes['success-icon']}
                        size={'1.5rem'}
                    />
                ) : (
                    <CircleX
                        className={classes['failure-icon']}
                        size={'1.5rem'}
                    />
                )}
                <p>{timestamp.toLocaleString()}</p>
            </div>
            <Link
                className={classes.details}
                to={`/environments/${environmentId}/scenarios/${scenarioId}/executions/${execution.id}`}
            >
                <p>Details</p>
                <ArrowRight size="1rem" />
            </Link>
        </div>
    )
}

export default ExecutionSummary
