import Button from "./Button"
import ToolboxTool from "./ToolboxTool"




const Toolbox = ({ selected, onRemove, onConnectingCols, onFormat, onSplittingCol }) => {

    return (
        <div className="col-10">
            <div className="toolbox-container d-flex align-items-center position-relative gap-1">
                <ToolboxTool text={"Add"} cbFunction={console.log} />
                <Button bgColor={"#F5F0E5"} text={"Remove"} height={"45px"} cbFunction={onRemove} />
                <ToolboxTool text={"Connect columns"} operationFunction={onConnectingCols} />

                <ToolboxTool text={"Split column"} operationFunction={onSplittingCol} />
                <ToolboxTool text={"Format options"} operationFunction={onFormat} />
                <Button bgColor={"#009963"} color={"white"} text={"Export"} width={"80px"} height={"45px"} cbFunction={console.log} />
            </div>
        </div>
    )
}

export default Toolbox;