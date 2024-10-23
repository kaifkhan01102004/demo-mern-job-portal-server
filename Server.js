const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./App");
const crypto = require('crypto');

// DB Connection
const DBConnectionHandler = require("./Utils/DBconnect");
DBConnectionHandler();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Job Hunter Server is running!");
});

// New route to generate a token using crypto
app.get('/generate-token', (req, res) => {
    const token = crypto.randomBytes(64).toString('hex');  // <-- Generate 64-byte token
    res.json({ token });  // Send the generated token as a response
});

// 404 Error handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// Error Handeling Middleware(default synchronous error handling middleware from express)
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next("There was a problem");
    } else {
        if (err.message) {
            res.status(err.status || 500).send(err.message);
        } else {
            res.status(500).send("Something went wrong");
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
