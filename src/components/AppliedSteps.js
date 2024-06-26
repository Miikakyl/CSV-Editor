import { useEffect, useState } from "react"

const AppliedSteps = ({newStep}) => {
    const [appliedSteps, setAppliedSteps] = useState([])

    useEffect(() => {
        if(newStep) {
            // for a single step
            if(!newStep.length)
                setAppliedSteps([...appliedSteps, newStep])
            // for a multiple step (E.g when removing multiple selection)
            else {
                
            }
        }
    }, [newStep])

    return (
        <div className="applied-steps-container">
            <p>Applied Steps</p>
            { appliedSteps.length > 0 &&
                appliedSteps.map((item,index) => (
                    <div 
                        key={index}
                        className="applied-step-item"
                    >
                        <h1 className="applied-step-item-header">{item.operation}</h1>
                        <p className="applied-step-item-msg">Position Row: {item.row}  Col: {item.column}  </p>
                    </div>
                ))
            }
        </div>
    )
}
 
export default AppliedSteps;