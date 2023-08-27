// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Set the specific origin of your frontend
    credentials: true // Allow sending credentials (cookies)
}));

const users = require("./routes/userRoute");

//database connection
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((e) => {
        console.log(e);
    });

app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

app.use("/users", users);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
