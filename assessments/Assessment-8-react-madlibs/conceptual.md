### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?

React is a front-end framework developed by Facebook that allows for front end elements to be grouped into reusable "Components" that combine HTML elements with javascript functionality.

- What is Babel?

Babel is a transpiler which can essentially translate code to be read by other code. Using Babel, an app can be made to be compatible with any browser, and browser version by transpiling with Babel. Babel can also transpile JSX into normal React code.

- What is JSX?

JSX is react syntax that mimics HTML so that Components can be designed as if they were HTML, but with the power of JavaScript functionality and the convenience of being written and read in JavaScript files.

- How is a Component created in React?

A component is created as a function which returns a single JSX element. A component can also be made as a class.

- What are some difference between state and props?

Props can only be passed into components like properties in HTML from the parent component or passed into a child component, and are immutable. State can be produced and used by the same component, and with the setter function, is mutable. State can also persist through renders, whereas props must be passed in every render. 

- What does "downward data flow" refer to in React?

Downward Data flow refers to the ability to pass functions and props down to child components by parent components, but the inability of child components to pass data up in the same way. The only avenue through which data can flow upwards is through functions passed into child components, or from data picked up directly from the changed DOM.

- What is a controlled component?

A controlled component is a component whose appearance and data are totally supplied by react. Even in a user controlled input field, the values put into the component are processed through React before appearing in the component. At all times, react is aware of the input.

- What is an uncontrolled component?

An uncontrolled component involves data that react is not aware of, ususally this is an input whose current status is unknown by react. 

- What is the purpose of the `key` prop when rendering a list of components?

The key prop add a unique identifier to each component, which is handy in manipulation. 

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?

An array index can easily change, which is why it is a bad choice for the component key. For example with a list of child components, if one in the middle is deleted, all the components after that component will now have a new key. 

- Describe useEffect.  What use cases is it used for in React components?

useEffect allows for the execution of logic or rendering after the original rendering of a component. This is used with a page that should render before all of the components. For example, with a shopping page with multiple products displayed, the page should load before every last product is done loading to view and navigate the page sooner. 

- What does useRef do?  Does a change to a ref value cause a rerender of a component?

useRef allows for the storage and change of data in a component. This is useful because the data persists through renders and because the data, when changed, does not cause a rerender. This is useful in operations that should not be interrupted, such as the playback of a video.

- When would you use a ref? When wouldn't you use one?

Refs should be used when changing the operation of components whose performance shouldn't be interrupted, such as playing a video or a game, where a rerender would interrupt the user experience. 

- What is a custom hook in React? When would you want to write one?

A custom hook is a hook which you can define and use in any component. This hook is used like the default hooks, and often uses them within, and adopts their functionality. By utilizing the default hooks, custom hooks become more powerful than functions. For example, a function in a component cannot have an effect after the component has rendered without causing a rerender, a function would not be able to hold data that persists through rerenders either. 