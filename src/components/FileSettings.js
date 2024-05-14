import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Papa from "papaparse"

import Button from "../components/Button"

const FileSettings = () => {
    const navigate = useNavigate()
    const fileInput = useRef(null)

    const [data, setData] = useState(null)
    const [headers, setHeaders] = useState("true")
    const [delimiter, setDelimiter] = useState(",")
    const [preview, setPreview] = useState(0)

    const handleFile = (event) => {
        Papa.parse(event.target.files[0], {
            header: headers === "true" ? true : false,
            delimiter: delimiter,
            preview: preview,
            complete: (result) => {
                console.log(result.data)
                setData(result.data)
            }
        })
    }

    //If file has been selected and then afterwards some of the settings are changed, previously stored data and file input will be reseted
    useEffect(() => {

        if (data) {
            console.log("reseted")
            fileInput.current.value = ""
            setData(null)
        }

    }, [headers, delimiter, preview])


    return (
        <div className="fileSettingsContainer">
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">Headers</p>
                    <select
                        className="fileSettingsInput">
                        <option value="true" onClick={(e) => setHeaders(e.target.value)}>True</option>
                        <option value="false" onClick={(e) => setHeaders(e.target.value)}>False</option>
                    </select>
                </div>
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">Delimiter</p>
                    <input
                        value={delimiter}
                        onChange={(e) => setDelimiter(e.target.value)}
                        className="fileSettingsInput"
                        type="text"
                    />
                </div>
                <div className="fileSettingsInputContainer">
                    <p className="fileSettingsInputHeader">Preview</p>
                    <input
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
                        onChange={handleFile}
                        type="file"
                        ref={fileInput}
                        accept=".csv"
                    />
                </div>
                {data &&
                    <Button
                        color="#14A44D"
                        width="100%"
                        cbFunction={() => navigate("MainPage", {params: data})}
                        text="Start Editing"
                    />
                }
        </div>
    )
}

export default FileSettings;