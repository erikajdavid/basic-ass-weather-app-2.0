require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000

//middlewear
app.use(cors());
app.use(express.json());

//register and login routes
app.use("/auth", require("./routes/auth/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/auth/dashboard"));

//weather route
app.use("/weather", require("./routes/api/openWeatherAPI"));

app.listen (PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
}); 

