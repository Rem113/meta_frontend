import React from 'react'
import { Link } from 'react-router-dom'
import { Environment } from '../../../../../data'
import RightArrowIcon from '../../../../components/Icons/RightArrowIcon'

import * as classes from './EnvironmentCard.module.scss'

interface EnvironmentCardProps {
	environment: Environment
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({ environment }) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.info}>
				<h3>{environment.name}</h3>
				<p className={classes.description}>{environment.description}</p>
			</div>
			<div className={classes.actions}>
				<div className={classes['view-simulators']}>
					<Link to={`/environments/${environment.id}/simulators`}>
						<p>Simulators</p>
						<RightArrowIcon />
					</Link>
				</div>
				<div className={classes['view-scenarios']}>
					<Link to={`/environments/${environment.id}/scenarios`}>
						<p>Scenarios</p>
						<RightArrowIcon />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default EnvironmentCard
