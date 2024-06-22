import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    await mongoose.connect(config.db_url as string);
  } catch (e) {
    console.log(e);
  }
}

main();

process.on('uncaughtException', () => {
  console.log(`😈 Uncaught exception detected: shutting down the server`);
  process.exit(1);
});

process.on('unhandledRejection', () => {
  console.log(`😈 Unhandled rejection detected: shutting down the server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
