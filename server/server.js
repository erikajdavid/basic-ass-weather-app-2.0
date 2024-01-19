require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000

//middlewear
app.use(cors());
app.use(express.json());

app.listen (PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
}); 

