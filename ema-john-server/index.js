const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kiav5mh.mongodb.net/?retryWrites=true&w=majority`;

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 4000

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = await client.db(`${process.env.DB_NAME}`);
    const productsCollection = await db.collection(`${process.env.COLLECTION_NAME}`);

    // CREATE OPERATION
    app.post('/addProduct', async (req, res) => {
        await client.connect();
        const products = req.body;

        await productsCollection.insertMany(products) // front end theke fakeData pathaitase & akhan theke data ek sathe mongoDB te insert kore detase.
        .then((result) => {
          res.send(result.insertedCount);
        })
    })

    // READ OPERATION
    app.get('/products', async (req, res) => {
        await client.connect();

        const cursor = productsCollection.find({})
        const services = await cursor.toArray();
        res.send(services);
    })

    // single product load from database when click on product title
    app.get('/product/:key', async (req, res) => {
        await client.connect();

        const clientKey = req.params.key;
        const cursor = productsCollection.find({key: req.params.key})
        const services = await cursor.toArray();
        res.send(services[0]); // jehetu amra 1 ta single item k return kortase tai array[0] dea lagbe.
    })
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port)