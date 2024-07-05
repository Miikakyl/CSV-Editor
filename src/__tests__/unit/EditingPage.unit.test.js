import { fireEvent, render, screen, waitFor, renderHook } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom'
import React from "react"
import EditingPage from "../../pages/EditingPage"

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(() => ({
        state: { data: [[ "number1", "number2"], [ "1","2"]] }
    }))
}))


describe(EditingPage, () => {

    //wip
})