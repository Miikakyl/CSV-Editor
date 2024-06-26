import React, { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

import DataTable from "../components/DataTable"
import AppliedSteps from "../components/AppliedSteps"
import Toolbox from "../components/Toolbox"


const EditingPage = () => {
    const location = useLocation()
    const passedData = location.state.data

    const [contentLoaded, setContentLoaded] = useState(false)
    const [data, setData] = useState(null)
    const [appliedStep, setAppliedStep] = useState("")
    const [selectedRows, setSelectedRows] = useState([])
    const [ctrlPressed, setCtrlPressed] = useState(false)
    const editingPageRef = useRef()



    useEffect(() => {
        setData(passedData)
        const timer = setTimeout(() => {
            setContentLoaded(true)
        }, 400)

        return () => clearTimeout(timer)
    }, [passedData])

    // Takes an array of numbers and returns all numbers between min and max values
    function numbersBetween(arr) {
        let highNum = Math.max(...arr)
        let lowNum = Math.min(...arr)
        let arrayBetween = []

        for (let i = lowNum; i <= highNum; i++) {
            arrayBetween.push(i)
        }
        return arrayBetween

    }

    const handleCellModifying = (changes) => {
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
                operation: "Cell modification"
            }
            setAppliedStep(appliedStepObj)
        }
    }
    const handleCellClicking = () => {
        setSelectedRows([])
    }

    const handleSelection = (rowPosition) => {
        console.log(rowPosition)
        if (ctrlPressed) {
            console.log("ctrl selection")
            setSelectedRows([...selectedRows, rowPosition])
        }
        else {
            console.log("singe selection")
            setSelectedRows([rowPosition])
        }
        setCtrlPressed(false)
    }
    const handleDrawSelection = (rowSelection) => {
        const drawSelectionRange = numbersBetween([rowSelection[0],rowSelection[2]])
        console.log(drawSelectionRange)
    }

    const handleDeselection = (element) => {
        // If user clicks out of the editingpage, the selectedRows will be emptied
        if ((editingPageRef.current && !editingPageRef.current.contains(element.target))) {
            setSelectedRows([])
        }
    }
    const handleRemove = () => {
        const indexesToRemove = selectedRows.map((obj) => obj.row)
        setData(data.filter((_, index) => !indexesToRemove.includes(index)))
        setSelectedRows([])
    }

    return (
        <div className={contentLoaded ? 'pageContainer show' : 'pageContainer'}>
            <h1 className="header kavoon-font">CSV Editor</h1>
            <div
                ref={editingPageRef}
                className="editingPageContent">
                <Toolbox
                    isSelected={selectedRows}
                    onRemove={handleRemove}
                />
                <DataTable
                    data={data}
                    onCtrlPressedChange={setCtrlPressed}
                    onSelection={handleSelection}
                    onCellModifying={handleCellModifying}
                    onDeselection={handleDeselection}
                    onCellClicking={handleCellClicking}
                    onDrawSelection={handleDrawSelection}
                />
                <AppliedSteps newStep={appliedStep} />
            </div>
        </div>
    )
}

export default EditingPage;