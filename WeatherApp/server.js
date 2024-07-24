projectData = {};

// Require Express to run server and routes
// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creating an Express application
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));


app.post('/addData', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData['temperature'] = temperature;
    projectData['date'] = date;
    projectData['userResponse'] = userResponse;
    res.send(projectData); 
});

app.get('/all', (req, res) => {
    res.send(projectData); 
});

// Define the port to run the server on
const port = process.env.port || 3001;

// Tell the app to listen on the specified port
app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});
