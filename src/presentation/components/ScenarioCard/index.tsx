import React from 'react'

import * as classes from './ScenarioCard.module.scss'
import { Scenario } from '../../../data'

import rightArrow from '../../../assets/icons/right arrow.svg'

interface ScenarioCardProps {
	scenario: Scenario
	onClick?: () => void
}

const ellipsized = (text: string, size: number): string => {
	if (text.length <= size) return text
	else return text.substring(0, size - 3) + '...'
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
	scenario,
	onClick = () => {},
}) => (
	<div className={classes.wrapper} onClick={_ => onClick()}>
		<div className={classes.info}>
			<h3>{scenario.name}</h3>
			<p className={classes.description}>
				{ellipsized(scenario.description, 70)}
			</p>
		</div>
		<img src={rightArrow} alt={'right arrow'} />
	</div>
)

export default ScenarioCard
