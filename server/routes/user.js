const express = require('express');
const User = require('../models/User');
const router = express.Router();


// router.post('/add', async (req, res) => {
//     const { name, position, plate, carType } = req.body;
//     try {
//         console.log(name, position, plate, carType);
//         const newUser = await User.create({ name, position, car: { plate, carType }});
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(404).json(error);
//     }
// })

router.post('/info', async (req, res) => {
    const { number, type, time } = req.body;
    try {
        const user = await User.findOne({'car.plate': number}).exec();        
        const { socket } = req;
        try {
        console.log('abc')
        if(type === 'in') {
            console.log('def')
            if(
                user.car.sessions.length === 0 ||
                user.car.sessions[user.car.sessions.length - 1].checkOut 
            ) {
                console.log('1')
                user.car.sessions.push({
                    checkIn: time,
                })          
                const userCheckIn = await user.save(); 
                console.log('userCheckin');
                socket.broadcast.emit('dataFromServer', { data: userCheckIn, time: time, type: "in" });
                res.status(202).json(userCheckIn);
            } else if (user.car.sessions.length > 0 &&
                user.car.sessions[user.car.sessions.length - 1].checkIn ) {
                user.car.sessions[user.car.sessions.length-1].checkIn = time;
                const userCheckIn = await user.save(); 
                console.log('userCheckin');
                socket.broadcast.emit('dataFromServer', { data: userCheckIn, time: time, type: "in" });
                res.status(202).json(userCheckIn);
            } else {
                console.log('2')
                socket.broadcast.emit('checkInFail', { error: "Chưa check out" });
                res.status(404).json({ err: "Check in fail "})
            }
        }
        if(type === 'out') {
            if( user.car.sessions.length > 0 && user.car.sessions[user.car.sessions.length - 1].checkIn) {
                console.log('3')
                user.car.sessions[user.car.sessions.length-1].checkOut = time;
                const userCheckDone = await user.save(); 
                // console.log('hello', userCheckDone);
                socket.broadcast.emit('dataFromServer', { data: userCheckDone, time: time, type: "out" });
                res.status(202).json(userCheckDone);             
            } else {
                console.log('4')
                socket.broadcast.emit('checkInFail', { error: "Chưa check in" });
                res.status(404).json({ err: "Check out fail "})
            }
        }   
        }     
        catch (error) {
            console.log(error);
            console.log('5')
             res.status(404).json(error);
        }
    } catch (error) {
        socket.broadcast.emit('checkInFail', { error: "Not found car" });
        res.json({ err: 'Not found'})
    }
    

})


module.exports = router;