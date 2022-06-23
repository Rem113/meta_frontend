import React from 'react'

import * as classes from './FloatingActionButton.module.scss'

interface FloatingActionButtonProps {
	icon: React.ReactNode
	onClick: () => void
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
	icon,
	onClick,
}) => {
	return (
		<>
			<button className={classes.button} onClick={onClick} type={'button'}>
				{icon}
			</button>
		</>
	)
}

export default FloatingActionButton
