import TodoList from "../TodoList";
import {render, fireEvent, queryByText} from "@testing-library/react";

describe("Tests for the TodoList component", () => {

    test("Renders", () => {
        render(<TodoList/>);
    })

    test("Renders the same UI consistently", () => {
        const { asFragment } = render(<TodoList />);
        expect(asFragment).toMatchSnapshot();
    })

    test("Adds todo item when form is submitted", () => {
        //Generate todo
        const { getByPlaceholderText, queryByText } = render(<TodoList />);
        const input = getByPlaceholderText("New Task");
        const button = queryByText("Post")
        fireEvent.change(input, {target: {value: "Groceries"}});
        fireEvent.click(button);

        //Check for todo
        const todo = queryByText("Groceries");
        expect(todo).not.toBeNull()
    })

    test("Clicking x removes specified todo list item", () => {
        const { getByPlaceholderText, queryAllByText } = render(<TodoList />);
        const input = getByPlaceholderText("New Task");
        const button = queryByText("Post")

        //Generate three todos
        fireEvent.change(input, {target: {value: "Groceries"}});
        fireEvent.click(button);
        fireEvent.change(input, {target: {value: "Walk Waldo"}});
        fireEvent.click(button);
        fireEvent.change(input, {target: {value: "Eat Boody"}});
        fireEvent.click(button);

        //Click x
        const xs = queryAllByText("x");
        fireEvent.click(xs[1]);

        //check for todo
        const todo1 = queryByText("Groceries");
        expect(todo1).not.toBeNull();
        const todo2 = queryByText("Walk Waldo");
        expect(todo2).toBeNull();
        const todo3 = queryByText("Eat Boody");
        expect(todo3).not.toBeNull();
    })
})