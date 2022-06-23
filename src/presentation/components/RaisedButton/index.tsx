import React from 'react'

import * as classes from './RaisedButton.module.scss'

interface RaisedButtonProps {
	text: string
	onClick: () => void
	disabled?: boolean
	icon?: React.ReactNode
	error?: string
	color?: 'primary' | 'secondary'
	size?: 'small' | 'medium' | 'large'
}

const RaisedButton: React.FC<RaisedButtonProps> = ({
	text,
	onClick,
	disabled,
	icon,
	error,
	color = 'primary',
	size = 'medium',
}) => (
	<div className={classes.wrapper}>
		<button
			className={`${classes[size]} ${classes[color]}`}
			type={'button'}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}{text}
		</button>
		<small className={classes.error}>{error}</small>
	</div>
)

export default RaisedButton
