### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?

React Router allows a developer to make a website navigable using client-side routing. This eases the load on the server, by only ever having to load one endpoint, while still allowing the user to access all the pages of a site or app. Instead of launching a new GET request to the server, the new front-end is introduced, then the URL is changed in order to match the page that was loaded. 

- What is a single page application?

A single page application uses no server-side routing and only utilizes client-side routing. 

- What are some differences between client side and server side routing?

Client-side routing is done on the client's machine, and makes no requests to the server, also, only the components which change are rerendered. In server-side routing, the entire page is taken away and replaced by the response from the server when naviting to a new URL. Server-side routing involves much more total communication between both machines, client-side routing sends more information up front, but limits the communication with the server after that. 

- What are two ways of handling redirects with React Router? When would you use each?

One way is to use a <Switch> component, which selects one and only one Route to render, and setting one <Redirect to=""> component when there are no matches for the path in the URL, and the other way is to use history.push(path), which manually adds on the last entry to the history object and takes you there. The history.push() method is useful for causing redirects after user actions, like form submits. 

- What are two different ways to handle page-not-found user experiences using React Router? 

Like with redirects, one method is to use <Switch> and having a <NotFound > component and the other method is to use history.push(). The <Switch> method is great for placing in the router component, and the history.push() method is great for returning after a user-triggered event. 

- How do you grab URL parameters from within a component using React Router?

Inside the route, a component or components are rendered. In those components, use the hook useParams() to destructure the params in the parent route. 

- What is context in React? When would you use it?

Context in React allows the developer to store values in a "Context Provider" and provide those values to all the children nested within that context. Then any child from there on forward will be able to use those values. This is similar to props, but with long-range value distribution potential, so it is best to use it when information needs to passed several "generations" down to a child.

- Describe some differences between class-based components and function
  components in React.

The most impactful difference is that class-based components do not use hooks. In reality, hooks were introduced to bolster the utility of functional components compared to class-based components. Instead of hooks, class-based components are depended on the methods comprising the component lifecycle to prepare and update information for the rendering and rerendering of a component. 

- What are some of the problems that hooks were designed to solve?

Hooks were designed to solve the problem of repetitive and redundant code. Hooks are also not rigid to the default hooks provided, and are customizable as well, without being confusing.