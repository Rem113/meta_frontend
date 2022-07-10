import React from 'react'

import * as classes from './FloatingActionButton.module.scss'

interface FloatingActionButtonProps {
    icon: React.ReactNode
    onClick: () => void
    disabled?: boolean
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    icon,
    onClick,
    disabled = false,
}) => {
    return (
        <button
            className={classes.button}
            onClick={onClick}
            type={'button'}
            disabled={disabled}
        >
            {icon}
        </button>
    )
}

export default FloatingActionButton
