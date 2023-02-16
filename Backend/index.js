const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const docsRoutes = require("./routes/docApiRoutes.js");

const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mgohz2e.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

//middleWares
const corsOptions = {
    origin: "http://localhost:3000",
    //update: or "origin: true," if you don't wanna add a specific one
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/docs", docsRoutes);

app.get("/", (req, res) => {
    res.send("Hello EveryOne!");
});

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
