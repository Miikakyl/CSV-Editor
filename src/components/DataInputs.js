import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Papa from "papaparse"

import Button from "./Button"

const DataInputs = () => {
    // const navigate = useNavigate()
    const fileInput = useRef(null)

    const [data, setData] = useState(null)
    const [fileName, setFileName] = useState("No files selected")
    const [headers, setHeaders] = useState("true")
    const [delimiter, setDelimiter] = useState(",")
    const [preview, setPreview] = useState(0)

    const handleFile = (event) => {
        Papa.parse(event.target.files[0], {
            header: headers === "true" ? true : false,
            delimiter: delimiter,
            preview: preview,
            complete: (result) => {
                setData(result.data)
            }
        })
        handleFileName(event.target.files[0].name)
    }


    const handleFileName = (name) => {
        
        if(name.length > 19) {
            const shortendName = name.slice(0,14)
            const extension = name.substr(name.length - 4,name.length - 1)
            
            setFileName(shortendName + extension)
        }
        else {
            setFileName(name)
        }
    }


    //If file has been selected and then afterwards some of the settings are changed, previously stored data and file input will be reseted
    useEffect(() => {

        if (data) {
            console.log("reseted")
            fileInput.current.value = ""
            setData(null)
            setFileName("No files selected")
        }

    }, [headers, delimiter, preview])


    return (
        <div className="fileSettingsContainer">
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">Headers</p>
                    <select
                        data-testid="headers-input"
                        className="fileSettingsInput">
                        <option value="true" onClick={(e) => setHeaders(e.target.value)}>true</option>
                        <option value="false" onClick={(e) => setHeaders(e.target.value)}>false</option>
                    </select>
                </div>
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">Delimiter</p>
                    <input
                        data-testid="delimiter-input"
                        value={delimiter}
                        onChange={(e) => setDelimiter(e.target.value)}
                        className="fileSettingsInput"
                        type="text"
                    />
                </div>
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">Preview</p>
                    <input
                        data-testid="preview-input"
                        value={preview}
                        onChange={(e) => setPreview(e.target.value)}
                        className="fileSettingsInput"
                        type="number"
                        min="0"
                        max="10000"
                    />
                </div>
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">CSV-file</p>
                    <input
                        data-testid="file-input"
                        onChange={handleFile}
                        type="file"
                        ref={fileInput}
                        accept=".csv"
                    />
                    <div 
                        data-testid="file-name"
                        className="fileName">
                        {fileName}
                    </div>
                </div>
                {data &&
                    <Button
                        color="#14A44D"
                        width="100%"
                        cbFunction={() => console.log("Navigate to Mainpage with data")}
                        text="Start Editing"
                    />
                }
        </div>
    )
}

export default DataInputs;