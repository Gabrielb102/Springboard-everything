const express = require('express');
const cors = require('cors');
const morgan = require("morgan");

const usersRoutes = require("./routes/users");
const APIroutes = require("./routes/FECAPIAPI");
const faveRoutes = require("./routes/favorites");
const { authenticateJWT } = require('./middleware/auth');

app = express(); 

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan("tiny"));
// just puts the user/admin info into res.locals 
app.use(authenticateJWT);

app.use("/users", usersRoutes);
app.use("/request", APIroutes);
app.use("/favorites", faveRoutes);

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    return res.status(status).json({
      error: {message: err.message,status: status}
    });
  });

// set router logic here

module.exports = app;