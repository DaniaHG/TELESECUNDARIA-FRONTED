const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(path.resolve("."),'/dist/material-app')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(path.resolve("."),'/dist/material-app'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
