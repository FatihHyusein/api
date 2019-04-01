const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

process.env.NODE_ENV === 'production' ?
    console.log('Running on PRODUCTION mode') :
    console.log('Running on DEVELOPMENT mode');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Cache-control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return next();
});

app.use(cors());
app.use(bodyParser.json());

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/resources', 'index.html'));
});

app.use('/api', require('./api'));
app.use('/resources', express.static('resources'));

// Last point, before sending the data to the client
app.use((req, res) => {
    // each api call should return data property in locals, otherwise it will be considered as not found
    const { data } = res.locals;
    if (typeof data === 'undefined') {
        res.status(404).send({ error: 'Api Endpoint Not Found' });
    }

    res.json(data);
});
app.use((err, req, res, next) => {
    next(err);
});

app.use((err, req, res, next) => {
    const { statusCode, message, stack } = err;

    !statusCode && process.env.NODE_ENV === 'production'
        ? res.status(500).send({ error: 'Something failed!' })
        : res.status(statusCode || 500).send({
            error: message || 'Something failed!',
            stack
        });
});


(async () => {
    const port = 1235;

    try {
        const server = http.createServer(app);

        server.listen(port, () => {
            console.log('\x1b[32m', `1. Server is running on port ${port}!`, '\x1b[0m');
        });
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
