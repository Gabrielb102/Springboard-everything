import { render, fireEvent } from "@testing-library/react";
import Title from "../Title";

describe("Tests for Title Component", () => {

    it("Renders", () => {
        render(<Title/>);
    })
    it("Renders a consistent user interface", () => {
        const id = '3516516548'
        const { asFragment } = render(<Title id={id} color='red' height='186px' width='36px' removeFunc={() => removeFunc(id)}/>);
        expect(asFragment).toMatchSnapshot();
    })
})