import { render, fireEvent, getByLabelText } from "@testing-library/react";
import NewBoxForm from "../NewBoxForm";

describe("Tests for NewBoxForm Component", () => {

    it("Renders", () => {
        render(<NewBoxForm/>);
    })

    it("Renders a consistent user interface", () => {
        const { asFragment } = render(<NewBoxForm />);
        expect(asFragment).toMatchSnapshot();
    })

    // I tried to mock the function called by the submitHandler, but mocking doesn't work the way it was 
    // described in the video :( Tried googling, but the suggestions I found are incompatible with react testing.
    // it("Adds a box when submitted", () => {
    //     addBoxFunc = jest.fn((c,w,h) => "woo it works!")
    //     const { getByText, getByTestId, getByLabelText } = render(<NewBoxForm/>);
    //     const submitButton = getByText("New Box");
    //     const colorInput = getByLabelText("Color");
    //     const heightInput = getByLabelText("Height");
    //     const widthInput = getByLabelText("Width");
    //     fireEvent.change(colorInput, {target: {value: "red"}});
    //     fireEvent.change(heightInput, {target: {value: "10px"}});
    //     fireEvent.change(widthInput, {target: {value: "100px"}});
    //     fireEvent.click(submitButton);
    //     expect(addBoxFunc.mock.calls.length).toEqual(1);
    // })
})