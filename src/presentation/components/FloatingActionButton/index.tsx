import React from 'react'

import * as classes from "./FloatingActionButton.module.scss"

interface FloatingActionButtonProps {
    icon: string
    alt: string
    onClick: () => void
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({icon, alt, onClick}) => {
    return <>
        <button className={classes.button} onClick={onClick}>
            <img src={icon} alt={alt}/>
        </button>
    </>
}

export default FloatingActionButton