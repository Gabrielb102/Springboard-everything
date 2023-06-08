function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}

const ExpressError = require("./expressError");

function checkForPassword(req, res, next) {
  try {  
    if (req.query.password !== 'poopoomelon') {
    throw new ExpressError("Missing Password", 402)
  }
  return next()
  } catch(e) {
    return next(e)
  }
} 


function onlyAllowElie(req, res, next) {
  try {
    if (req.params.name === "Elie") {
      return next();
    } else {
      throw new ExpressError("Unauthorized", 401);
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = { logger, onlyAllowElie, checkForPassword};
