require('dotenv').config();
const express = require("express");
const app = express();
const userRouter = require('./routes/user')
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
    
const port = process.env.APP_PORT;
/// user routes ///
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });