import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import apiStructureRouter from "./routes/apiStructure.js";
import tablesRouter from './routes/tables.js';
import apiServiceRouter from './routes/apiServiceRoute.js';

import  mongoPool from "./dataAccess/mongoPool.js";


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use("/apiStructure", apiStructureRouter);
app.use("/tables", tablesRouter);
app.use("/apiService",apiServiceRouter)

const CONNECTION_URL = 'mongodb+srv://testuser:testuser123@cluster0.xyl9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoPool.initPool();

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

