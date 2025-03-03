import 'reflect-metadata';  
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';  
import databaseService from './service/database-service';
import userRouter from './routes/user';

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

databaseService.initialize()
.then(() => {
  console.log('Database initialized');
})
.catch((error) => {
    console.log('Database connection failed');
    console.log(error);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});