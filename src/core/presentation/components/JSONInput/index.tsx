import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/ext-language_tools'

import * as classes from './JSONInput.module.scss'

interface JSONInputProps {
    value: string
    onChange: (value: string) => void
    label?: string
    error?: string
}

const JSONInput: React.FC<JSONInputProps> = ({ value, onChange, label, error }) => {
    return (
        <div className={classes.wrapper}>
            {label && <label className={classes.label}>{label}:</label>}
            <div className={classes['editor-wrapper']}>
                <AceEditor
                    className={classes.editor}
                    mode={'json'}
                    fontSize={'1rem'}
                    minLines={3}
                    maxLines={10}
                    showGutter={false}
                    showPrintMargin={false}
                    value={value}
                    onChange={value => onChange(value)}
                />
            </div>
            <small className={classes.error}>{error}</small>
        </div>
    )
}

export default JSONInput
