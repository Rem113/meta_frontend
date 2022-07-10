import React from 'react'
import DownArrowIcon from '../Icons/DownArrowIcon'

import * as classes from './SelectInput.module.scss'

interface SelectInputProps {
    value: string
    options: string[]
    onChange: (value: string) => void
    label?: string
}

const SelectInput: React.FC<SelectInputProps> = ({
    value,
    options,
    onChange,
    label,
}) => {
    return (
        <div className={classes.wrapper}>
            {label && <label className={classes.label}>{label}:</label>}
            <select
                className={classes.select}
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <DownArrowIcon className={classes.arrow} />
        </div>
    )
}

export default SelectInput
