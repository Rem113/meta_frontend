import React from 'react'
import RightArrowIcon from '../Icons/RightArrowIcon'

import * as classes from './Card.module.scss'

interface CardProps {
	name: string
	description: string
	onClick?: () => void
}

const ellipsized = (text: string, size: number): string => {
	if (text.length <= size) return text
	else return text.substring(0, size - 3) + '...'
}

const Card: React.FC<CardProps> = ({
	name,
	description,
	onClick = () => {},
}) => (
	<div className={classes.wrapper} onClick={() => onClick()}>
		<div className={classes.info}>
			<h3>{name}</h3>
			<p className={classes.description}>{ellipsized(description, 70)}</p>
		</div>
		<RightArrowIcon className={classes.icon} />
	</div>
)

export default Card
