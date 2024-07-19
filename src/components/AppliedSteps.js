import { useEffect, useState } from "react"

import undo from "../assets/undo.png"

const AppliedSteps = ({ newStep }) => {
    const [appliedSteps, setAppliedSteps] = useState([])

    useEffect(() => {
        if (newStep) {
            const today = new Date()
            let h = today.getHours()
            let m = today.getMinutes()
            newStep.time = `${h}.${m < 10 ? '0' : ''}${m}`
            if (!newStep.length)
                setAppliedSteps([...appliedSteps, newStep])
            // for a multiple step (E.g when removing multiple selection)
            else {

            }
        }
    }, [newStep])


    const createStepElement = (item, index) => {


        return (
            <div
                key={index}
                className="d-flex align-items-center justify-content-between my-3"
            >
                <div>
                    <h1 className="applied-step-item-header">{item.operation}</h1>
                    <p className="applied-step-item-msg">Time: {item.time}, Row: {item.row}, Col: {item.column}</p>
                </div>
                <img className="align-self-start remove-icon" style={{ width: "24px", height: "24px" }} src={undo} />
            </div>
        )
    }

    return (
        <div className="col-2 d-flex justify-content-end">
            <div className="applied-steps-container">
                <div className="applied-steps-header-container d-flex justify-content-start align-items-center">
                    <p className="applied-steps-header ps-3">Applied Steps</p>
                </div>
                <div className="px-3 applied-steps">
                    {appliedSteps.length > 0 &&
                        appliedSteps.map((item, index) => (
                            createStepElement(item, index)
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AppliedSteps;