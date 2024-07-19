import 'handsontable/dist/handsontable.full.min.css'
import { registerAllModules } from 'handsontable/registry'
import { HotTable } from '@handsontable/react'
import { useEffect } from 'react'

registerAllModules()

const DataTable = ({ data, onCtrlPressedChange, onRowSelection, onColSelection, onCellModifying, onDeselection, onCellClicking }) => {

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
           <div className="col-10 data-table-container">
                <HotTable
                    afterSelectRows={(from) => onRowSelection(from)}
                    afterSelectColumns={(from) => onColSelection(from)}
                    beforeOnCellMouseDown={() => onCellClicking()}
                    afterSetDataAtCell={(changes) => onCellModifying(changes)}
                    afterDeselect={() => {
                        document.addEventListener("mousedown", (event) => {
                            onDeselection(event)
                        })
                    }}
                    data={data}
                    rowHeaders={true}
                    colHeaders={true}
                    width={"100%"}
                    height="100%"
                    minRows={100}
                    minCols={30}
                    licenseKey="non-commercial-and-evaluation"
                />
           </div>
        )
    }
}

export default DataTable