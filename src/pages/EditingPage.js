import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import DataTable from "../components/DataTable"
import AppliedSteps from "../components/AppliedSteps"


const EditingPage = () => {
    const location = useLocation()
    const passedData = location.state.data
    const headersBool = location.state.headers

    const [contentLoaded, setContentLoaded] = useState(false)
    const [data, setData] = useState(null)
    const [appliedStep, setAppliedStep] = useState("")

    const [selectedRows, setSelectedRows] = useState([])


    useEffect(() => {
        setData(passedData)
        console.log(headersBool)
        const timer = setTimeout(() => {
            setContentLoaded(true)
        }, 400)

        return () => clearTimeout(timer)
    }, [passedData])


    const handleSelectedRows = (from,to) => {

        console.log("from: " + JSON.stringify(from) + "to: " + JSON.stringify(to))
    }

    const handleCellModifying = (changes) => {
        const appliedStateMsg = `Cell in position Row: ${changes[0][0] + 1} Column: ${changes[0][1] + 1} modified`
        const row = changes[0][0]
        const column = changes[0][1]
        let modifiedData = data
        modifiedData[row][column] = changes[0][3]

        setData(modifiedData)
        setAppliedStep(appliedStateMsg)
    }

    const handleRemove = () => {

    }


    return (
        <div className={contentLoaded ? 'pageContainer show' : 'pageContainer'}>
            <h1 className="header kavoon-font">CSV Editor</h1>
            <div className="pageContent">
                <DataTable 
                    data={data}
                    onSelectRows={handleSelectedRows}
                    onCellModifying={handleCellModifying}
                    headers={headersBool}
                />
                <AppliedSteps appliedStep={appliedStep}/>
            </div>
        </div>
    )
}

export default EditingPage;