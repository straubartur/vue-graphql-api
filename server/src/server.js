const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const schema = require('../graphql')

const { ApolloServer } = require('apollo-server-express');

const port = 4000;
const path = '/graphql';

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

const server = new ApolloServer(schema)

server.applyMiddleware({ app, path })


app.listen(port, () => {console.log('starting graphql server on port 4000')})