const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());


//see all the cars
server.get('/api/cars', async (req, res) => {
    try {
        const cars = await db('cars');
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'failed to load cars' });
    }
});


//see a specific car
server.get('/api/cars/:id', async (req, res) => {
    try {
        const car = await db('cars')
                            .where({ id: req.params.id })
                            .first();
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'failed to load car' });
    }
});

//add a new car
server.post('/api/cars', async (req, res) => {
    const newCar = req.body;
    if(newCar.vin && newCar.make && newCar.model && newCar.mileage) {
        try {
            const ids = await db('cars')
              .insert(newCar);
            res.status(200).json({ message: `new car created with ${ids} id` })
        } catch (err) {
            res.status(500).json({ message: 'failed to create car' });
        }
    } else {
        res.status(400).json({ message: 'I need the vin, make, model, and mileage to add the vehicle'});
    }
});

//update a car

server.put('/api/cars/:id', async (req, res) => {
   const changes = req.body;
   try{
       await db('cars')
          .where({ id: req.params.id })
          .update(changes)
          .then(count => {
              if(count > 0) {
                res.status(200).json({ message: 'the car was updated' })
              } else {
                res.status(404).json({ message: 'that ID is invalid' })
              }
          })
   } catch (err) {
    res.status(500).json({ message: 'server error while updating the car' });
   }
})

module.exports = server;