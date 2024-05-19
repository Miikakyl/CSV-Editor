import { fireEvent, render, screen } from "@testing-library/react"
import DataInputs from "../../components/DataInputs"


describe(DataInputs, () => {

    it("should upload file and then display the file name", async () => {
        render(<DataInputs />)
        const testFile = new File(['1,2,3,4,5'], 'foo.csv', {type: 'text/plain'})
        const fileInput = screen.getByTestId("file-input")
    
        fireEvent.change(fileInput, { target: { files: [testFile]}})
    
        expect(screen.getByTestId("file-name").textContent).toBe("foo.csv")
    })
})

