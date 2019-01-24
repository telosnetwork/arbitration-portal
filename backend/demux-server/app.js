import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import demux from './src/services/demux';
import assert from 'assert';
import mongoose from 'mongoose';

let app = express();
app.use(cors());

const url = 'mongodb://localhost:27017/test'; //TODO: should be in configuration (.env) file

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
   const db = mongoose.connection;
   console.log('mongoose connect()');
   db.on('error', console.error.bind(console, 'connection error:'));

   demux.watch();
   db.once('open', () => {
      console.log('mongodb connection open!');
   });
});







app.listen(process.env.SERVER_PORT, () => console.info(`Pippin demux server listening on port ${process.env.SERVER_PORT}!`));