import Card from "../Card";
import { render, fireEvent } from "@testing-library/react";

describe("Tests for the Card component", () => {
    it("renders", () => {
        render(<Card />);
    });

    it("consistently renders the right HTML", () => {
        const { asFragment } = render(<Card />);
        expect(asFragment).toMatchSnapshot();
    });
})