
### Conceptual Exercise

  

Answer the following questions below:

  

### What is a JWT?

JWT stands for JSON Web Token, which is a token created by the server for use in authentication. The token contains three parts: the header, the body, and the signature. Both the header and the body are Base 64 encoded, not encrypted, and then the header, body, and secret key are used to create a hash with a hashing algorithm that you can specify. This way, the message is accessible by anyone, however it cannot be changed, because any changes would dramatically alter the hash, which is used for verification, which is done on the server side. 

This token can then be used for authentication, thanks to the secure signature, and it can also be more flexibly utilized than other authentication mechanisms, like cookies. It is up to the creator(s) of the app where and when the JWT is sent, which means that it is only sent when necessary. The token can also be utilized outside of the app in other related apps.
  

### What is the signature portion of the JWT? What does it do?

 The signature of the JWT is what makes it useful in security. The signature is a hash created with the JWT header and payload along with a secret hey and a specified algorithm that is verified along with the token whenever it is used to make a request that requires authentication. The signature of a JWT changes automatically if the payload or header are changed, meaning that the header and the body are immutable if the JWT is to successfully authenticate a user.


### If a JWT is intercepted, can the attacker see what's inside the payload?

  Yes! The attacker can see the information inside the payload because it is only encoded in Base 64, not encrypted in any way. Only the signature is kept secret, meaning that only the secret key is kept secret.

### How can you implement authentication with a JWT? Describe how it works at a high level.

  Authentication with a JWT works by verifying the signature. The signature is unique to a JWT made with the specific secret key that the server used with the specific contents that JWT has. The rest of the contents are immutable without affecting the key.

### Compare and contrast unit, integration and end-to-end tests.

  Unit tests verify a particular function or small process works. Integration tests make sure that several parts of a script work together to complete a certain key process. End-to-end tests simulate a user experience or workflow to assure that when undergoing use, a user will not encounter errors.

### What is a mock? What are some things you would mock?

 A mock is a way of faking a function's performance for the sake of simplicity. Many functions or processes depend on other smaller functions or bits of code to work, and mocking presents a contrived output for those small accessory functions, this allows for the larger overall function to be tested quicker or more efficiently. Some things that mocking would be useful for is mocking API or axios requests, since those would require writing asynchronous code and/or getting responses from the API, which may be billable. 

### What is continuous integration?

  Continuous integration is the practice of frequently committing your work. The idea is that small changes at a time are easier to debug and less likely to cause problems than large changes to a program. There are programs which automate parts of this, such as testing before every commit, and blocking commits that fail.

### What is an environment variable and what are they used for?

Environment variables are stored on the environment that "you" or the server is operating on, which could be any directory. Many of them expire after the session is done, meaning when you kill the process it goes away as well. These variables are used frequently to set modes for the program, as different files and directories in the program could all take cues from an environment variable, since it is external to them.
  
### What is TDD? What are some benefits and drawbacks?

TDD stands for Test Driven Development, a practice in which tests for a certain new feature is written before the code for it is written. After the tests are written, the code for the feature is written and adjusted until the tests are passed. The benefits of TDD include always having tests, as well as testable code, and as a result bugs are generally easier to find and resolve. The drawbacks are that tests are written for all the code, which is time consuming. Generally, the idea is that the time spent coding the tests will be saved by the even longer time spent debugging if the tests weren't written.
  

### What is the value of using JSONSchema for validation?

JSON Schema make sure that a peice of data abides by the restrictions set by the database and data from the database abides by the demands of your app, which avoids errors caused by bad data.
  

### What are some ways to decide which code to test?

  Code on which other code is dependent is very important to test, and code which is expected to be used frequently is also very important to test.

### What does `RETURNING` do in SQL? When would you use it?

RETURNING in SQL gives an output when one isn't given by default. I would use this to get feedback from queries that don't give feedback, but I want a receipt for their success. Most of the time, I use RETURNING to get confirmation that a new data point was created or that data was updated.

### What are some differences between Web Sockets and HTTP?

  The primary difference between Web Sockets and HTTP is that the communication is bidiretional with web sockets, and the communication is constant. HTTP has back and forths of requests and responses that happen, exchanging data, each single request gets one response. One analogy would be if both people in a two person conversation never stopped speaking but kept understanding each other, Web Sockets is that conversation. HTTP is like sending letters, but much faster.

### Did you prefer using Flask over Express? Why or why not (there is no right answer here

I'll admit, I liked using Flask more because Python had less little idiosyncracies that I had to mind, like having parentheses in the right places, and semicolons and things like that, and Flask is very simple to use compared to node, and it is also lighter by simply utilizing a requirements.txt and venv instead of node_modules and package.json, which originally I found messy. If I were to create a project of my own however, I would use Express because out of the box it is more configurable in how I would like the app to run, it also keeps dependencies more organized and well-documented. Node is easier to adapt to your precise needs, and it gives you a more precise picture of what's going on as well. Also, one last detail: not having to jump in and out of my venv was pretty nice.

There is no right or wrong because as far as I can tell, anyone can do anything using anything. JWTs can be used with Flask and cookies can be used with Express. If there's functionality that one language or framework lacks, it is just one package away from being there. For example, python automatically has functionality to download packages, whereas npm must be installed for node, but that is a ten second install of a difference. Flask also has a built in development mode, where Express requires Nodemon to do the same thing, but it can be added no problem. For an example the other way around, the process for reinstalling dependencies is much more facilitated with npm (which is a package already) but I'm sure something can be found to complement Python's venv in the same way.