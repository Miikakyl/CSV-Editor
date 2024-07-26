import Button from "./Button"
import ToolboxTool from "./ToolboxTool"




const Toolbox = ({ selected, onRemove, onConnectingCols, onFormat, onSplittingCol, onConvertingToJson,onAdd }) => {

    return (
        <div className="col-10">
            <div className="toolbox-container d-flex align-items-center position-relative gap-1">
                <Button text={"Add"} cbFunction={onAdd} width={"80px"} fontSize={"14px"} />
                <Button bgColor={"#F5F0E5"} text={"Remove"} width={"80px"} height={"45px"} cbFunction={onRemove} fontSize={"14px"} />
                <ToolboxTool text={"Connect columns"} operationFunction={onConnectingCols} width={"80px"} fontSize={"14px"} />

                <ToolboxTool text={"Split column"} operationFunction={onSplittingCol} width={"80px"} fontSize={"14px"} />
                <ToolboxTool text={"Format options"} operationFunction={onFormat} width={"80px"} fontSize={"14px"} />
                <Button bgColor={"#009963"} color={"white"} text={"Export"} width={"80px"} height={"45px"} cbFunction={onConvertingToJson} />
            </div>
        </div>
    )
}

export default Toolbox;