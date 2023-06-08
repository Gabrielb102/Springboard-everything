import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "../Carousel";

describe("Tests for Carousel component", () => {

  it("renders", () => {
    render(<Carousel />);
  });

  it("consistently renders the right HTML", () => {
    const { asFragment } = render(<Carousel />);
    expect(asFragment).toMatchSnapshot();
  });
  
});

describe("Tests Carousel for working arrow buttons", () => {
  
  it("works when you click on the left arrow on the second image", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // move forward in the carousel just to set the stage
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    
    // move back in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);
  
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  });

  it("works when using the left arrow to cycle to the last image from the first", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
    
    // move back in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);
  
    // expect the third image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  });

  it("works when you click on the right arrow", () => {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
  
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  
    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
  
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  });

})
