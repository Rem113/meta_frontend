import React from 'react'

import * as classes from './Chip.module.scss'

interface ChipProps {
    icon?: React.ReactNode
    text: string
    selected?: boolean
    onClick?: () => void
}

const Chip: React.FC<ChipProps> = ({
    icon,
    text,
    selected = false,
    onClick,
}) => {
    return (
        <div
            className={`${classes.wrapper} ${
                selected ? classes.selected : ''
            } ${onClick !== undefined ? classes.clickable : ''}`}
            onClick={onClick}
        >
            {icon}
            {text}
        </div>
    )
}

export default Chip
