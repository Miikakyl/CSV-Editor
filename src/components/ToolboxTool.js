import { useEffect, useState } from "react"

import Button from "./Button"

const ToolboxTool = ({ text, operationFunction, width, fontSize }) => {
    const [value, setValue] = useState("")
    const [formatValue, setFormatValue] = useState("")
    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className="toolbox-tool-container" style={{width: width, fontSize: fontSize}}>
            <Button text={text} cbFunction={toggleDropdown} />
            {dropdown && (text === "Connect columns" || text === "Split column") &&
                <div className="toolbox-items position-absolute d-flex justify-content-center">
                    <input 
                        type={text.includes("Connect")? "text" : "number"}
                        className="toolbox-input" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} placeholder={text.includes("Connect") ? "Enter delimiter" : "Enter position"} 
                    />
                    <Button
                        bgColor={"white"}
                        fontSize={"14px"}
                        color={"#009963"}
                        text={"Submit"}
                        width={"80px"}
                        height={"30px"}
                        cbFunction={() => {
                            operationFunction(value)
                            setValue("")
                            toggleDropdown()
                        }}
                    />
                </div>
            }

            {dropdown && (text === "Format options") &&
                <div className="toolbox-items position-absolute">
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex pb-2">
                            {formatValue &&
                                <>
                                    {formatValue !== "uppercase" && formatValue !== "lowercase"
                                        ?
                                        <input
                                            type="text"
                                            className="toolbox-input"
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder={`Enter ${formatValue}`}
                                        />
                                        :
                                        <div className="toolbox-input">
                                                
                                        </div>                               
                                    }

                                    <Button
                                        bgColor={"white"}
                                        fontSize={"14px"}
                                        color={"#009963"}
                                        text={"Submit"}
                                        width={"80px"}
                                        height={"30px"}
                                        cbFunction={() => {
                                            operationFunction({
                                                formatType: formatValue,
                                                value: value
                                            })
                                            setValue("")
                                            setFormatValue("")
                                            toggleDropdown()
                                        }}
                                    />
                                </>
                            }
                        </div>
                        <div className="toolbox-radio-buttons d-flex flex-column justify-content-around align-items-start ps-3">
                            <div className="d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="lowercase"
                                    checked={
                                        formatValue ===
                                        "lowercase"
                                    }
                                    onChange={(e) =>
                                        setFormatValue(e.target.value)
                                    }
                                />
                                <label>Lowercase</label>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="uppercase"
                                    checked={
                                        formatValue ===
                                        "uppercase"
                                    }
                                    onChange={(e) =>
                                        setFormatValue(e.target.value)
                                    }
                                />
                                <label>Uppercase</label>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="suffix"
                                    checked={
                                        formatValue ===
                                        "suffix"
                                    }
                                    onChange={(e) =>
                                        setFormatValue(e.target.value)
                                    }
                                />
                                <label>Suffix</label>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="prefix"
                                    checked={
                                        formatValue ===
                                        "prefix"
                                    }
                                    onChange={(e) =>
                                        setFormatValue(e.target.value)
                                    }
                                />
                                <label>Prefix</label>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ToolboxTool