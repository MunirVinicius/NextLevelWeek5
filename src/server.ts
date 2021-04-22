import express from "express";

import {routes} from "./routes";

import './database';  

//routes

const app = express ();

app.use(express.json());
app.use(routes);

//routes

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})