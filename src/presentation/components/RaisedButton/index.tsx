import React from 'react'

import * as classes from './RaisedButton.module.scss'

interface RaisedButtonProps {
	text: string
	onClick: () => void
	disabled?: boolean
	icon?: React.ReactNode
	color?: 'primary' | 'secondary'
	size?: 'small' | 'medium' | 'large'
}

const RaisedButton: React.FC<RaisedButtonProps> = ({
	text,
	onClick,
	disabled,
	icon,
	color = 'primary',
	size = 'medium',
}) => (
	<button
		className={`${classes[size]} ${classes[color]}`}
		type={'button'}
		onClick={onClick}
		disabled={disabled}
	>
		{icon}
		{text}
	</button>
)

export default RaisedButton
