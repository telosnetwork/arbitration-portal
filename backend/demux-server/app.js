import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import mongoose from 'mongoose';
import models  from './src/models';

//TODO: Set up logging

//Services
import Demux from './src/services/demux';
import ServiceManager from "./src/services/ServiceManager";

let services = new ServiceManager([]);

let app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));

   try {
      services.addService('demux', new Demux(models, {
         version: 'v1', //TODO: set version in environment configuration
         endpoint: process.env.TELOS_ENDPOINT,
         startBlock: parseInt(process.env.STARTING_BLOCK),
         interval: 250
      }));

      services.startAll();

   } catch(e) {
      console.log('service start error: ', e);
   }

   app.listen(process.env.SERVER_PORT, () => console.info(`arbitration server listening on port ${process.env.SERVER_PORT}!`));
});

