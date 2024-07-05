import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import DataInputs from "../../components/DataInputs"

describe(DataInputs, () => {

    it("should display correct initial values ", () => {
        render(
            <MemoryRouter>
                <DataInputs />
            </MemoryRouter>
        )

        // Initial values
        expect(screen.getByDisplayValue('true')).toBeInTheDocument()
        expect(screen.getByDisplayValue(',')).toBeInTheDocument()
        expect(screen.getByDisplayValue('0')).toBeInTheDocument()

    })
    it("should change headers input value", () => {
        render(
            <MemoryRouter>
                <DataInputs />
            </MemoryRouter>
        )

        const headersInput = screen.getByTestId("headers-input")

        fireEvent.change(headersInput,{target: {value: 'false'}})
        expect(headersInput.value).toBe("false")

        fireEvent.change(headersInput,{target: {value: 'true'}})
        expect(headersInput.value).toBe("true")

    })
    it("should change delimiter input value", () => {
        render(
            <MemoryRouter>
                <DataInputs />
            </MemoryRouter>
        )

        const delimiterInput = screen.getByTestId("delimiter-input")

        fireEvent.change(delimiterInput,{target: {value: ';'}})
        expect(delimiterInput.value).toBe(";")

        fireEvent.change(delimiterInput,{target: {value: ' '}})
        expect(delimiterInput.value).toBe(" ")

    })

    it("should change preview input value", () => {
        render(
            <MemoryRouter>
                <DataInputs />
            </MemoryRouter>
        )

        const previewInput = screen.getByTestId("preview-input")

        fireEvent.change(previewInput,{target: {value: "1"}})
        expect(previewInput.value).toBe("1")

        fireEvent.change(previewInput,{target: {value: "100"}})
        expect(previewInput.value).toBe("100")

    })
    
    it("should upload file and then display the file name", async () => {
        render(
            <MemoryRouter>
                <DataInputs />
            </MemoryRouter>
        )
        const testFile = new File(['1,2,3,4,5'], 'foo.csv', {type: 'text/plain'})
        const fileInput = screen.getByTestId("file-input")
    
        fireEvent.change(fileInput, { target: { files: [testFile]}})
    
        expect(screen.getByTestId("file-name").textContent).toBe("foo.csv")
    })
})