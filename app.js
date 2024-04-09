import express from 'express';
import { callGraphApi, callNeo4jApi } from './external-api.js';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.get('/graph-api', async (_req, res) => {
    try {
        const data = await callGraphApi();
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/neo-api', async (_req, res) => {
    try {
        const data = await callNeo4jApi();
        res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});