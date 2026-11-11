import express from 'express';

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to my REST API!');
});

app.get('/api/v1/cats', (req, res) => {
    const cat = {
        cat_id: 1,
        name: 'Frank',
        birthdate: '2021-04-12',
        weight: 5.2,
        owner: 'Alex',
        image: 'https://loremflickr.com/320/240/cat',
    };

    res.json(cat);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
