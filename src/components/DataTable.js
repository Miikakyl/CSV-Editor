import 'handsontable/dist/handsontable.full.min.css'
import { registerAllModules } from 'handsontable/registry'
import { HotTable } from '@handsontable/react'
import { useEffect } from 'react'

registerAllModules()

const DataTable = ({ data,onCtrlPressedChange,onSelection, onCellModifying, onDeselection, onCellClicking, onDrawSelection }) => {

    const handleKeyDown = (event) => {
        if (event.ctrlKey) {
            onCtrlPressedChange(true)
        }
    }

    const handleKeyUp = (event) => {
        if (!event.ctrlKey) {
            onCtrlPressedChange(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])
   
    if (data) {
        return (
            <div className="dataTableContainer">
                <HotTable
                    afterSelectRows={(from) => onSelection(from)}
                    beforeOnCellMouseDown={() => onCellClicking()}
                    afterSetDataAtCell={(changes) => onCellModifying(changes)}
                    afterDeselect={() => {
                        document.addEventListener("mousedown", (event) => {
                            onDeselection(event)
                        })
                    }}
                    afterDrawSelection={(currentRow, currentColumn, cornersOfSelection, layerLevel) => onDrawSelection(cornersOfSelection)}
                    data={data}
                    rowHeaders={true}
                    width={"100%"}
                    height="100%"
                    minRows={100}
                    minCols={20}
                    licenseKey="non-commercial-and-evaluation"
                />
            </div>
        )
    }
}

export default DataTable