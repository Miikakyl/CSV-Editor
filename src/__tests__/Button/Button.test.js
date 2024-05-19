import { fireEvent, render, screen } from "@testing-library/react"
import Button from "../../components/Button"

describe(Button, () => {

    it("Displays text that is passed via props", () => {
        render(<Button text={"Start Editing"}/>)
        const buttonText = screen.getByTestId("button-text").textContent
        
        expect(buttonText).toEqual("Start Editing")
    })
    
    it("Calls callback function when clicking", () => {
        const mockFunction = jest.fn()
        render(<Button cbFunction={mockFunction}/>)
        const button = screen.getByTestId("button-text")

        fireEvent.click(button)
        expect(mockFunction).toHaveBeenCalled()
    })
})