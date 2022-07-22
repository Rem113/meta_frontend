import React from 'react'
import { Command } from '../../../../../data'

import * as classes from './CommandCard.module.scss'
import { Track } from 'tabler-icons-react'

interface CommandCardProps {
    command: Command
}

const CommandCard: React.FC<CommandCardProps> = ({ command }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes['name-and-version']}>
                <h1>{command.name}</h1>
                <div className={classes.version}>
                    <Track className={classes.icon} />
                    <p>/{command.path}</p>
                </div>
            </div>
            <h3>{command.description}</h3>
        </div>
    )
}

export default CommandCard
