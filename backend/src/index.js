import dotenv from "dotenv-defaults"
import mongoose from 'mongoose'
import mongo from './mongo'
import httpServer from './server'


const db = mongoose.connection

db.once('open', () => {
  console.log("MongoDB connected!");
});

httpServer.listen({ port: process.env.PORT | 5001 }, () => {
  console.log(`Server listening on: http://localhost:${process.env.PORT | 5001}!`);
});