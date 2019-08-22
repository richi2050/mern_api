import express from "express";
//const express = require('express');
import morgan from "morgan";
//const morgan= require('morgan');
import cors from "cors";
//const cors = require('cors');
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

/* conexion con mongodb */
const URI_DB = "mongodb://root:root123@ds259787.mlab.com:59787/mern";
mongoose.set('useCreateIndex', true);
mongoose
  .connect(URI_DB, { useNewUrlParser: true })
  .then((mongoose) => console.log("Conexión exitosa con la BDD"))
  .catch((err) => console.log("Error conexión"));

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);

app.listen(port, () => {
  console.log("El servidor esta escuchando en el puerto " + port);
});
