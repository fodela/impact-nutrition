import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.get('', async (req, res) => {
  try {
    // create the database if it doesn't exist
    const dbName = "impact-nutrition";
    await prisma.$executeRaw(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database ${dbName} created or already exists`);
    
    // connect to the database
    await prisma.$connect();
    console.log('Connected successfully to the database');

    // your database queries go here

    // close the database connection
    await prisma.$disconnect();
    console.log('Disconnected from the database');

    res.send('You are connected here');
  } catch (err) {
    console.error("Error connecting to the database", err);
    res.status(500).send('Error connecting to the database');
  }
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
