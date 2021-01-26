const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  const infoAdmin = {
    username: "ldkhanh",
    password: "1"
  };

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json({
      msg: "Vui lòng nhập tài khoản và mật khẩu"
    });
  }

  if (username !== infoAdmin.username) {
    res.status(404).json({
      msg: "Tài khoản không đúng"
    });
  }

  if (password !== infoAdmin.password) {
    res.status(404).json({
      msg: "Mật khẩu không đúng"
    });
  }

  jwt.sign(
    {
      id: `${username}${password}`
    },
    process.env.jwtSecret,
    (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Login successs",
        token
      });
    }
  );
});

router.post("/add", auth, async (req, res) => {
  const { name, position, plate, carType } = req.body;
  const sessions = [];
  try {
    console.log(name, position, plate, carType);
    const newUser = await User.create({ name, position, car: { plate, carType, sessions } });
    res.status(201).json(newUser);
  } catch (error) {
    console.log("err", error);
    res.status(404).json(error);
  }
});

router.post("/session", auth, async (req, res) => {
  const limit = 2;
  const { index } = req.body;
  const skip = index * limit;
  try {
    const users = await User.find({}).limit(limit).skip(skip);
    let amount = await User.find({});
    let newArr = [];
    users.forEach(user => {
      const { car, name, position } = user;
      const { plate, carType, sessions } = car;
      sessions.forEach(session => {
        let checkIn = session.checkIn && session.checkIn;
        let checkOut = session.checkOut && session.checkOut;
        newArr.push({
          plate,
          carType,
          name,
          position,
          checkIn,
          checkOut
        });
      });
    });

    res.status(200).json({ sessions: newArr, maxPage: Math.ceil(amount.length / limit) });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;
