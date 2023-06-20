const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userEndpoints = require("./Endpoints/userEndpoints");

const app = express();

dotenv.config();
//body parser
app.use(express.json());
app.use(cors());
app.use("/", userEndpoints);

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on the port: ${port}`);
    });
}).catch((error) => {
    console.log(error.toString());
});

