import { render, fireEvent, getByTestId } from "@testing-library/react";
import BoxList from "../BoxList";

describe("Tests for BoxList Component", () => {

    it("Renders", () => {
        render(<BoxList/>);
    })

    it("Renders a consistent user interface (no boxes)", () => {
        const { asFragment } = render(<BoxList />);
        expect(asFragment).toMatchSnapshot();
    })

    it("Adds a box when form is submitted", () => {
        const { getByText, getByTestId, getByLabelText } = render(<BoxList/>);
        const submitButton = getByText("New Box");
        const colorInput = getByLabelText("Color");
        const heightInput = getByLabelText("Height");
        const widthInput = getByLabelText("Width");
        fireEvent.change(colorInput, {target: {value: "red"}});
        fireEvent.change(heightInput, {target: {value: "10px"}});
        fireEvent.change(widthInput, {target: {value: "100px"}});
        fireEvent.click(submitButton);
        const box = getByTestId("box")
        expect(box).not.toEqual(null);
    })

    it("appears when form is submitted", () => {
        const handleSubmit = jest.fn((e) => {
            e.preventDefault()
            addBoxFunc("red", "250px", "50px");
            setFormData(INITIALCONDITIONS);
        })
        const {getByTestId} = render(<BoxList/>);
        const testForm = getByTestId("form");
        fireEvent.submit(testForm);
        const testBoxes = getByTestId("box");
        expect(testBoxes).toBeInDocument;

    })

    it("Removes box when the x is clicked", () => {
        const { getByText, queryByTestId, getByLabelText } = render(<BoxList/>);
        const submitButton = getByText("New Box");
        const colorInput = getByLabelText("Color");
        const heightInput = getByLabelText("Height");
        const widthInput = getByLabelText("Width");
        fireEvent.change(colorInput, {target: {value: "red"}});
        fireEvent.change(heightInput, {target: {value: "10px"}});
        fireEvent.change(widthInput, {target: {value: "100px"}});
        fireEvent.click(submitButton);
        const testBoxesBeforeX = queryByTestId('box');
        const xButton = getByText("x");
        fireEvent.click(xButton);
        // Cannot figure out debugger, turn in and follow up with mentor
        const testBoxesAfterX = queryByTestId('box');
        expect(testBoxesBeforeX).not.toEqual(null);
        expect(testBoxesAfterX).toEqual(null);
    })


})