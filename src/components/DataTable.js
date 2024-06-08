import React, { useEffect } from 'react'
import 'handsontable/dist/handsontable.full.min.css'
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry'
import { HotTable } from '@handsontable/react'

registerAllModules()

const DataTable = ({ data, headers, onSelectRows, onCellModifying}) => {

   

    if (data) {
        return (
            <div className="dataTableContainer">
                <HotTable
                    beforeSetRangeStart={(coords) => console.log(coords)}
                    beforeSetRangeEnd={(coords) => console.log(coords)}
                    
                    afterSetDataAtCell={(changes) => onCellModifying(changes)}
                    afterRowMove={() => console.log("Row moved")}
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