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
                console.log(csvData)
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
        <div className="file-settings-container">
            <div className="my-3">
                <p className="file-settings-input-header mb-2">Headers</p>
                <select
                    data-testid="headers-input"
                    className="file-settings-input"
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value === "true")}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div className="my-3">
                <p className="file-settings-input-header mb-2">Delimiter</p>
                <input
                    data-testid="delimiter-input"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="file-settings-input"
                    type="text"
                />
            </div>
            <div className="my-3">
                <p className="file-settings-input-header mb-2">Preview</p>
                <input
                    data-testid="preview-input"
                    value={preview}
                    onChange={(e) => setPreview(e.target.value)}
                    className="file-settings-input"
                    type="number"
                    min="0"
                    max="10000"
                />
            </div>
            <div className="d-flex align-items-center my-3">
                <div className="file-upload-button">
                    <p className="file-upload-button-text">Import</p>
                    <input
                        data-testid="file-input"
                        onChange={handleFile}
                        type="file"
                        ref={fileInput}
                        accept=".csv"
                    />
                </div>
                <p
                    data-testid="file-name"
                    className="file-name m-0">
                    {fileName}
                </p>
            </div>
            {data &&
                <Button
                    bgColor="#009963"
                    color="white"
                    width="100%"
                    height="45px"
                    cbFunction={() => navigate("EditingPage", { state: { data: data, headers: headers } })}
                    text="Start Editing"
                />
            }
        </div>
    )
}

export default DataInputs;