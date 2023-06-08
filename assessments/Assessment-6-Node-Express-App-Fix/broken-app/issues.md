# Broken App Issues
## Issues with broken-app

**Issues**
 1. The libraries are imported and then set to mutable variables. App is also set to a mutable variable.
	 - Fixed by setting imported libraries and app equal to constants	
 2. It is not possible to have asynchronous arrow functions.
	 - function refactored as declared function
 3. There is no error handling
	 - Added error handling code.
 4. Variables are not well named.
	 - out changed to 
 5. List item

6. There is no middleware to parse the json in the request body.
	 - Added express.json() to parse the request body.

**Refactoring**
 - The requests are made and awaited sequentially, limiting the speed of the code.
	 - All of the requests promises were awaited with a Promise.all() and the json was made right when the data was ready by using .then()
 - The return statement is much too complicated
	 - Simplified to res.json(out)
- It is not easy to tell whether or not the server is running
	- Added a message to say when the server is listening.