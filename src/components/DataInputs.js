import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Papa from "papaparse"

import Button from "./Button"

const DataInputs = () => {
    const navigate = useNavigate()
    const fileInput = useRef(null)

    const [data, setData] = useState(null)
    const [fileName, setFileName] = useState("No files selected")
    const [headers, setHeaders] = useState(true)
    const [delimiter, setDelimiter] = useState(",")
    const [preview, setPreview] = useState(0)

    const handleFile = (event) => {
        Papa.parse(event.target.files[0], {
            header: headers,
            delimiter: delimiter,
            preview: preview,
            complete: (result) => {
                let csvData = result.data

                if(headers) {
                    csvData = convertObjTOArray(result.data)
                }
                setData(csvData)
            }
        })
        handleFileName(event.target.files[0].name)
    }

    /* If the header property is set to true in Papa.parse, rows will be presented as objects of data keyed by the field name.
       So in order to Handsomtable to populate the whole data table area with empty rows the data must be array of rows.
    */
    const convertObjTOArray = (convertionData) => {
        const headerRow = Object.keys(convertionData[0])

        let convertedData = convertionData.map( obj => {
            return Object.values(obj)
        })

        convertedData = [headerRow,...convertedData]
        
        return convertedData
    }

    const handleFileName = (name) => {

        if (name.length > 19) {
            const shortendName = name.slice(0, 14)
            const extension = name.substr(name.length - 4, name.length - 1)

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
                    className="fileSettingsInput"
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value === "true")}>
                    <option value="true">true</option>
                    <option value="false">false</option>
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
                <div className="fileUploadButton">
                    <input
                        data-testid="file-input"
                        onChange={handleFile}
                        type="file"
                        ref={fileInput}
                        accept=".csv"
                    />
                    <p className="fileUploadButtonText">Import</p>
                </div>
                <p
                    data-testid="file-name"
                    className="fileName">
                    {fileName}
                </p>
            </div>
            {data &&
                <Button
                    color="#14A44D"
                    width="100%"
                    cbFunction={() => navigate("EditingPage", { state: { data: data, headers: headers } })}
                    text="Start Editing"
                />
            }
        </div>
    )
}

export default DataInputs;