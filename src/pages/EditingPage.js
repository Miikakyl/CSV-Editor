import React, { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

import DataTable from "../components/DataTable"
import AppliedSteps from "../components/AppliedSteps"
import Toolbox from "../components/Toolbox"
import Logo from "../components/Logo"


const EditingPage = () => {
    const location = useLocation()

    const [contentLoaded, setContentLoaded] = useState(false)
    const [data, setData] = useState(null)
    const [appliedStep, setAppliedStep] = useState("")
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedCols, setSelectedCols] = useState([])
    const [ctrlPressed, setCtrlPressed] = useState(false)
    const editingPageRef = useRef()



    useEffect(() => {
        const timer = setTimeout(() => {
            if (location?.state && location.state.data) {
                setData(location.state.data)
                setContentLoaded(true)
            }
        }, 400)

        return () => clearTimeout(timer)
    }, [location])


    const createAppliedStepObj = () => {

    }

    const handleCellModifying = (changes) => {
        console.log(changes)
        const row = changes[0][0]
        const column = changes[0][1]
        const oldValue = changes[0][2]
        const newValue = changes[0][3]

        if (oldValue !== newValue) {
            let modifiedData = data
            modifiedData[row][column] = changes[0][3]

            setData(modifiedData)

            const appliedStepObj = {
                row: row,
                column: column,
                oldValue: oldValue,
                newValue: newValue,
                operation: "Cell modified"
            }
            setAppliedStep(appliedStepObj)
        }
    }

    const handleCellClicking = () => {
        setSelectedRows([])
        setSelectedCols([])
    }

    const handleColSelection = (colPosition) => {
        setSelectedRows([])
        if (ctrlPressed) {
            const alreadyExists = selectedCols.some(item => item.col === colPosition.col)
            if (!alreadyExists) {
                setSelectedCols([...selectedCols, colPosition])
            }
        }
        else {
            setSelectedCols([colPosition])
        }
        setCtrlPressed(false)
    }

    const handleRowSelection = (rowPosition) => {
        setSelectedCols([])
        if (ctrlPressed) {
            setSelectedRows([...selectedRows, rowPosition])
        }
        else {
            setSelectedRows([rowPosition])
        }
        setCtrlPressed(false)
    }

    const handleDeselection = (element) => {
        console.log("deselected")
        // If user clicks out of the editingpage, selectedRows or selectedCols will be emptied
        if ((editingPageRef.current && editingPageRef.current.contains(element.target) === false)) {
            setSelectedRows([])
            setSelectedCols([])
        }
    }
    const handleConnectingCols = (delimiter) => {

        console.log("handleConnectingCols fired")
        if (selectedCols.length >= 2) {
            const colsToConnect = selectedCols.map((obj) => obj.col)

            const fixedData = data.map(row => {
                const concatenatedValues = colsToConnect.map(index => row[index])
                const isAllEmpty = concatenatedValues.every(value => value === null || value === undefined || value === "")
                const concatenatedValue = isAllEmpty ? concatenatedValues.join("") : concatenatedValues.join(delimiter)

                // Create a new row with the connected value and nulls
                return row.map((value, index) => {
                    if (index === colsToConnect[0]) {
                        // Replace the first column to connect with the concatenated value
                        return concatenatedValue

                    } else if (colsToConnect.includes(index)) {
                        // Replace other connected columns with null
                        return null
                    } else {
                        // Keep the original value for all other columns
                        return value
                    }
                }).filter((value, index) => index === colsToConnect[0] || !colsToConnect.includes(index)) //Filtering out other connected columns
            })

            console.log(fixedData)
            setData(fixedData)
            setSelectedCols([])
        }
    }

    const handleFormattingCols = (formatObj) => {
        const formatType = formatObj.formatType
        const value = formatObj.value

        if (selectedCols) {
            const colsToFormat = selectedCols.map((obj) => obj.col) // Col indexes

            const fixedData = data.map((row, i) => {
                const newRow = [...row]

                colsToFormat.forEach(index => {

                    if (newRow[index]) {
                        switch (formatType) {
                            case "prefix":
                                newRow[index] = value.concat(newRow[index])
                                break
                            case "suffix":
                                newRow[index] = newRow[index].concat(value)
                                break
                            case "uppercase":
                                newRow[index] = newRow[index].toUpperCase()
                                break
                            case "lowercase":
                                newRow[index] = newRow[index].toLowerCase()
                                break
                            default:
                                break
                        }
                    }
                })
                return newRow
            })
            setData(fixedData)
            setSelectedCols([])
        }
    }

    const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)]

    const handleSplittingCol = (position) => {
        const colsToSplit = selectedCols.map((obj) => obj.col)

        if (selectedCols.length === 1) {
            const fixedData = data.map(row => {
                const newRow = [...row]

                let splittedValue

                colsToSplit.forEach(index => {
                    splittedValue = newRow[index] ? splitAt(position, newRow[index]) : null
                })

                newRow[colsToSplit[0]] = splittedValue ? splittedValue[0] : splittedValue
                newRow.splice(colsToSplit[0] + 1, 0, splittedValue ? splittedValue[1] : splittedValue)

                return newRow
            })
            setData(fixedData)
            setSelectedCols([])
        }
    }

    const handleRemove = () => {
        if (selectedRows.length !== 0) {
            const indexesToRemove = selectedRows.map((obj) => obj.row)
            setData(data.filter((_, index) => indexesToRemove.includes(index) === false))
            setSelectedRows([])
        }
        if (selectedCols.length !== 0) {
            const colsToRemove = selectedCols.map((obj) => obj.col)
            const fixedData = data.map(row =>
                row.filter((_, index) => colsToRemove.includes(index) === false)
            )
            setData(fixedData)
            setSelectedCols([])
        }
    }

    return (
        <div className={contentLoaded ? 'page-container show' : 'page-container'}>
            <Logo />
            <div
                data-testid={"editingPage"}
                ref={editingPageRef}
                className="container-fluid my-3 px-5">
                <div className="row">
                    <Toolbox
                        selected={selectedRows ? selectedRows : selectedCols}
                        onRemove={handleRemove}
                        onConnectingCols={handleConnectingCols}
                        onFormat={handleFormattingCols}
                        onSplittingCol={handleSplittingCol}
                    />
                </div>
                <div className="row d-flex justify-content-between g-2">
                    <DataTable
                        data={data}
                        onCtrlPressedChange={setCtrlPressed}
                        onRowSelection={handleRowSelection}
                        onColSelection={handleColSelection}
                        onCellModifying={handleCellModifying}
                        onDeselection={handleDeselection}
                        onCellClicking={handleCellClicking}
                    />
                    <AppliedSteps newStep={appliedStep} />
                </div>
            </div>
        </div>
    )
}

export default EditingPage;