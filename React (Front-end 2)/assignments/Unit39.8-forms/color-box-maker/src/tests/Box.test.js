import { render, fireEvent, queryByTestId, getByTestId } from "@testing-library/react";
import Box from "../Box";
import NewBoxForm from "../NewBoxForm";

describe("Tests for Box Component", () => {

    it("Renders", () => {
        render(<Box/>);
    })

    it("Renders a consistent user interface", () => {
        const id = '3516516548'
        const { asFragment } = render(<Box id={id} color='red' height='186px' width='36px' removeFunc={() => removeFunc(id)}/>);
        expect(asFragment).toMatchSnapshot();
    })

})