import React from 'react'

import * as classes from './TextInput.module.scss'

interface TextInputProps {
    value?: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
    error?: string
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder,
    label,
    error,
}) => (
    <div className={classes.wrapper}>
        {label && <label className={classes.label}>{label}:</label>}
        <input
            className={classes.input}
            type={'text'}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        />
        <small className={classes.error}>{error}</small>
    </div>
)

export default TextInput
