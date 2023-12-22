require("dotenv").config()
const express = require("express")
const app = new express();
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose");
const Routers = require("./routers/index")
const morgan = require("morgan")
const bodyParser = require("body-parser")

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(express.urlencoded({limit: '50mb', extended : true}));



const DB_URL = process.env.MONGO_DB_URL
mongoose.connect(DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use("/api/user", Routers)


app.listen(PORT, ()=>console.log(`Your server started and listnenig port ${PORT}`))