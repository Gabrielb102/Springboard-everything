

### Conceptual Exercise

  

Answer the following questions below:

  

- What are some ways of managing asynchronous code in JavaScript?

  Asynchronous code can usually be managed by using async and await. Async labels a function as asynchronous, so that the rest of the program will not wait for its completion in order to proceed. Await is used within the function to mark which asynchronous processes need to be waited for in order to proceed.
  Node features some functions which can execute asynchronous functionality synchronously, in which case, they can be wrapped in try/catch syntax to process any errors that may result. 

- What is a Promise?

	A promise is what is delivered by an asynchronous process when it is called. At first it is delivered and the promise is unfulfilled, then when the asynchronous process completes, the promise is fulfilled, and contains the results of the process within the body. 
  

- What are the differences between an async function and a regular function?

	Async functions contain processes which require waiting, and return promises instead of the direct result. 

- What is the difference between Node.js and Express.js?

	Node.js is server-side javascript which allows javascript to be used for composing terminal commands and for running a server. Express allows node.js to make requests and handle responses, like Flask for python.  

- What is the error-first callback pattern?

	 The error-first callback pattern assumes that if there is only one parameter, that it is an error, becuase the error is the first specified parameter. If no error is given, the error parameter given will be null.

- What is middleware?

  Middleware is software that is executed after the request and before the response. 

- What does the `next` function do?

	Next calls the function that is supposed to take place after the current function. Often used in middleware, next is what keeps the request/response process moving if middleware is involved or if there is an error while it is taking place. 
  

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

  In this snippet of code, each request takes place sequentially, which means that this function requires the longest duration it could possibly require in order to execute. To make all of the requests a little quicker, the promises could all be made in parallel and then awaited in sequence. In this process, the promises are still awaited in sequence, however they were all started in parallel, which means they are all processing at the same time instead of being forced to wait for one another. Another method for processing these requests in parallel is to include them in a promise.all() statement, which would execute them all at once, then return them all at once. Another issue is that the elie, joel, and matt variables may be more aptly named elieJson, joelJson, and mattJson.
  

```js

async  function  getUsers() {

const  elie = await  $.getJSON('https://api.github.com/users/elie');

const  joel = await  $.getJSON('https://api.github.com/users/joelburton');

const  matt = await  $.getJSON('https://api.github.com/users/mmmaaatttttt');

  

return [elie, matt, joel];

}

```

- What does the `next` function do?

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
