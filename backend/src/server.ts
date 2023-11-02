import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import KorisnikRouter from './Routers/KorisnikRouter';
const app = express();

const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/src/PDFDOCS', express.static('src/PDFDOCS'));

mongoose.connect('mongodb://127.0.0.1:27017/projekat2')
const connection = mongoose.connection;
connection.once('open', () => { 
    console.log('MongoDB database connection established successfully!');
})

const router = express.Router();
router.use('/korisnik', KorisnikRouter);

app.use('/', router);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));