const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_Secret = "you vs you";
// route :1 create a user using post api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "enter valid name").isLength({ min: 5 }),
    body("password", "password is too short").isLength({ min: 8 }),
    body("email", "enter valid email").isEmail(),
  ],
  async (req, res) => {
    //if there are error return bad request
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //check weather the email id already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "User already exists!!" });
      }
      const salt = await bcrypt.genSalt(10);

      var secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_Secret);

      // res.json(user);
      success=true;
      res.json({ success,token });
    } catch (error) {
      //for catch error
      console.error(error.message);
      res.status(500).send("Error");
    }
  }
);

// route 2:create a user using post api/auth/login

router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success,error: "Incorrect Login Details" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res.status(400).json({ success,error: "Incorrect Login Details" });

      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_Secret);
success=true;
      // res.json(user);
      res.json({ success,token });
    } catch (error) {
      //for catch error
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
// route 3:get a user using post api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
