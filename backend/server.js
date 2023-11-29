const express = require('epxress');
require('dotenv').config()
const path = require('path');
const app = express();
const { Client } = require('pg');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiKey = process.env.adzunaKey;
const apiID = process.env.adzunaID;
const apiURL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const resultsPerPage = 10;
// const page = 1; including the page in the apiURL for the timebeing. Need to implement pagination
// ElephantSQL connection sstring (replace with credentials)
const connectionString = process.env.DATABASE_URI;

// Create a PostgreSQL client
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Connect to database
client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Error connecting to the database: ', err.message)
    })


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src', 'index.html'));
});

app.use(express.static('../frontend/index.html'))

app.get('/jobs', async (req, res) => {
    try {
        // Extract parameters from the request query. Location doesn't seem to work (returns 400)
        const { title, location, salaryMin, fullTime, skills } = req.query;

        // Construct the URL with additional parameters. Location doesn't seem to work (returns 400)
        const url = `${apiURL}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}&what=${title}&what_and=${skills}&location0=${location}&salary_min=${salaryMin}&full_time=${fullTime}`

        const responses = await fetch(url)
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: 'adzuna get request query error'})
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
