import React from 'react'

import * as classes from './JSONInput.module.scss'
import Editor, { useMonaco } from '@monaco-editor/react'

interface JSONInputProps {
    value: string
    onChange: (value: string) => void
    label?: string
    error?: string
}

const JSONInput: React.FC<JSONInputProps> = ({
    value,
    onChange,
    label,
    error,
}) => {
    const monaco = useMonaco()

    if (monaco !== null) {
        console.log(monaco.editor)
    }

    return (
        <div className={classes.wrapper}>
            {label && <label className={classes.label}>{label}:</label>}
            <div className={classes['editor-wrapper']}>
                <Editor
                    className={classes.editor}
                    language="json"
                    theme={'vs-dark'}
                    options={{
                        automaticLayout: true,
                    }}
                    // fontSize="1rem"
                    // enableSnippets={true}
                    // setOptions={{
                    //     enableBasicAutocompletion: true,
                    //     enableLiveAutocompletion: true,
                    // }}
                    // highlightActiveLine={false}
                    // minLines={3}
                    // maxLines={10}
                    // showPrintMargin={false}
                    value={value}
                    onChange={value => onChange(value!)}
                />
            </div>
            <small className={classes.error}>{error}</small>
        </div>
    )
}

export default JSONInput
