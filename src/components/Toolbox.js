import Button from "./Button"

const Toolbox = ({isSelected,onRemove}) => {
    return (
        <div
            className="toolbox-container">
            <Button
                color={isSelected.length === 0? "#555555" : "#f44336"}
                text="Remove row"
                width="80px"
                cbFunction={isSelected.length === 0? null : onRemove}
            />
        </div>
    )
}
 
export default Toolbox;