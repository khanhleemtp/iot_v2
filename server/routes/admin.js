const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/add', async (req, res) => {
    const { name, position, plate, carType } = req.body;
    const sessions = [
    ]
    try {
        console.log(name, position, plate, carType);
        const newUser = await User.create({ name, position, car: { plate, carType, sessions } });
        res.status(201).json(newUser);
    } catch (error) {
        console.log('err', error)
        res.status(404).json(error);
    }
})  

module.exports = router;