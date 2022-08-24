const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const db = require('./queries.js')
const port = 3030

app.set('host', '127.0.0.1');
app.use(bodyParser.json())
app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.get('/api', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/api/apps', db.getAll)
app.get('/api/apps/:filterName', db.getByFilter)
app.post('/api/apps', db.create)
app.delete('/api/apps/:id', db.remove)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
