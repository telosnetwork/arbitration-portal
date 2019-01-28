import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import mongoose from 'mongoose';
import models  from './src/models';

import assert from 'assert';

//Services
import Demux from './src/services/demux';

let services = [];

let app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));

   services.push(new Demux(models, {
      version: 'v1',
      endpoint: process.env.TELOS_ENDPOINT,
      interval: 250
   }));

   services.forEach((service) => {
      service.start();
   });

   app.listen(process.env.SERVER_PORT, () => console.info(`arbitration server listening on port ${process.env.SERVER_PORT}!`));
});

