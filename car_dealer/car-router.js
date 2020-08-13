const express = require('express');
const knex = require('knex');
const router = express.Router();

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: './data/car_dealer.db3'
    },
    useNullAsDefault: true
});


router.get('/', (req, res) => {
    db('cars')
    .then(car => {
      res.json(car); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});
  