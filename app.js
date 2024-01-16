// app.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Replace these with your database connection details
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ruhulamin',
  database: 'bangladesh_svg_map'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define a simple query (replace with your own query)
const query = 'SELECT path FROM districts where id = 50';

// Handle the route to fetch data and generate SVG
app.get('/', (req, res) => {
  // Perform the database query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    // Extract the 'path' property from the result
    const svgPath = results[0].path; // Assuming there is only one result

    // Generate SVG string based on the fetched data
    const svgString = `<svg width="1200" height="800" fill = "#f16522">
      ${svgPath}
    </svg>`;

    // Send the HTML response with the SVG string
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SVG Demo</title>
        </head>
        <body>
          <div>${svgString}</div>
        </body>
      </html>
    `);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
