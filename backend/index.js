require("dotenv").config();

const connectToMongo = require("./db");
const express = require("express");

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");

app.use(express.json());
app.use(cors());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`dpNotebook Backend Listening at ${port}`);
});
