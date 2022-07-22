import React from 'react'

import * as classes from './Card.module.scss'
import { ArrowRight } from 'tabler-icons-react'

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
            <p className={classes.description}>
                {ellipsized(description, 100)}
            </p>
        </div>
        <ArrowRight size={'1.5rem'} />
    </div>
)

export default Card
