const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // You can change this to any port you prefer

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file (for single-page apps)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'popup.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
