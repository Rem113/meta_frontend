import React, { ChangeEvent, useRef } from 'react'

import * as classes from './FileInput.module.scss'

import RaisedButton from '../RaisedButton'
import UploadIcon from '../Icons/UploadIcon'

interface FileInputProps {
    file: File | null
    onFileSelected: (file: File) => void
    label?: string
    error?: string
}

const FileInput: React.FC<FileInputProps> = ({
    file,
    onFileSelected,
    label,
    error,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const buttonText = file ? file!.name : 'Upload a file'

    return (
        <div className={classes.wrapper}>
            {label && <label className={classes.label}>{label}:</label>}
            <input
                className={classes.hidden}
                ref={inputRef}
                type={'file'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files !== null)
                        onFileSelected(e.currentTarget.files[0])
                }}
            />
            <RaisedButton
                text={buttonText}
                onClick={() => inputRef.current?.click()}
                icon={<UploadIcon />}
                size={'small'}
                color={'secondary'}
            />
            <small className={classes.error}>{error}</small>
        </div>
    )
}

export default FileInput
