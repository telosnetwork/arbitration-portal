import express from 'express';
import cors    from 'cors';
import 'dotenv/config';
import posts    from './src/routes/posts';
import mongoose from 'mongoose';
import models   from './src/models';

//TODO: Set up Logging?

//Services
import Demux from './src/services/demux';
import io    from './src/utils/io';
import ServiceManager from "./src/services/ServiceManager"

let services = new ServiceManager([]);

let app = express();
app.use(cors()); // Use Cors middleware -> Return Access-Control-Allow-Origin: *
app.use('/posts', posts());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
   const db = mongoose.connection;

   db.on('connected', () => {
      console.info(`Mongoose default connection open to ${process.env.MONGO_URL}`);
   });

   db.on('disconnected', () => {
      console.info(`Mongoose default connection disconnected from ${process.env.MONGO_URL}`);
   });

   db.on('error', console.error.bind(console, 'Mongoose connection error:'));

   try {
      services.addService('demux', new Demux(models, {
         version:    process.env.VERSION,
         endpoint:   process.env.TELOS_ENDPOINT,
         startBlock: parseInt(process.env.STARTING_BLOCK),
         interval:   parseInt(process.env.INTERVAL)
      }));

      services.startAll();

   } catch (e) {
      console.log('Service start error: ', e);
   }

   const server = app.listen(process.env.SERVER_PORT, () => console.info(`Arbitration server listening on port ${process.env.SERVER_PORT}!`));

   // Socket IO
   io.connect(server);
});

