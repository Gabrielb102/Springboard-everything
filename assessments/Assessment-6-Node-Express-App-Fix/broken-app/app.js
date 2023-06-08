const express = require('express');
const axios = require('axios');
const { request } = require('express');
const app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    const requestedDevs = req.body.developers
    const requestArray = Promise.all(requestedDevs.map((devUsername) => {
      return axios.get(`https://api.github.com/users/${devUsername}`)
        .then(data => {
          return ({"name" : data.data.name, "bio" : data.data.bio})
        })
        .catch(err => next("Unable to download data from GitHub: ", err));
    }));
    res.json(await requestArray)
  } catch(err) {
    next(err);
  }
});

app.use(function(err, req, res, next) {
  let status = err.status || 500;
  return res.status(status).json({
    error: {message: err.message,status: status}
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
