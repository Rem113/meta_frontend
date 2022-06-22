import React, {ChangeEvent, useRef} from "react"

import * as classes from "./FileInput.module.scss"

import upload from "../../../assets/icons/upload.svg"
import RaisedButton from "../RaisedButton";

interface FileInputProps {
    file: File | null
    onFileSelected: (file: File) => void
    label?: string
    error?: string
}

const FileInput: React.FC<FileInputProps> = ({file, onFileSelected, label, error}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const buttonText = file ? file!.name : "Upload a file"

    return <div className={classes.wrapper}>
        {label && <label className={classes.label}>{label}:</label>}
        <input className={classes.hidden} ref={inputRef} type={"file"} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.files !== null) onFileSelected(e.currentTarget.files[0])
        }
        }/>
        <RaisedButton text={buttonText} onClick={() => {
            inputRef.current?.click()
        }} icon={upload} alt={"upload"} size={"small"} color={"secondary"} error={error}/>
    </div>
}

export default FileInput