const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "dhruvprajapati909";

// ROTE 1 : Create a User using: POST "/api/auth/createuser". No login Required
router.post(
  "/createuser",
  [
    //Set Validation
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be atleast 5 charecter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are Errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether the user with email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json("Sorry a user with this email already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new User
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
      //   res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error Occured");
    }
  }
);

// ROTE 2 : Authenticate a User using: POST "/api/auth/login". No login Required
router.post(
  "/login",
  [
    //Set Validation
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are Errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login correct Credentials" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login correct Credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  }
);

// ROTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select(
      "-password"
    );
    console.log(userid);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});
module.exports = router;
