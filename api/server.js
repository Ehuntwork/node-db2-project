const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const carsRouter = require('../car_dealer/car-router');

const server = express();

server.use(helmet());
server.use(express.json());

//server.use('/api/cars', carsRouter) **NOT WORKING**   vvvvv--code bellow instead--vvvvv

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: './data/car_dealer.db3'
    },
    useNullAsDefault: true
});

server.get('/', (req, res) => {
    db('cars')
    .then(car => {
      res.json(car); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});


server.post('/', (req, res) => {
    db('cars')
    .insert(req.body)
    .then(ids => {
      console.log(ids)
      db('cars')
      .then(newEntry => {
        res.status(201).json(newEntry);
      });
    })
    .catch (err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Failed to store data" });
    });
  });
  
module.exports = server;