import React from 'react'

import * as classes from './TextInput.module.scss'

interface TextInputProps {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	label?: string
}

const TextInput: React.FC<TextInputProps> = ({
	value,
	onChange,
	placeholder,
	label,
}) => (
	<div className={classes.div}>
		{label && <label className={classes.label}>{label}</label>}
		<input
			className={classes.input}
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	</div>
)

export default TextInput
