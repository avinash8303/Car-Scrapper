import express from 'express';
import userRouter from './routers/userRouter.js';
import adminRouter from './routers/adminRouter.js';
import vendorRouter from './routers/vendorRouter.js';
import carRouter from './routers/carRouter.js';
import scrapRouter from './routers/scrapRequestRouter.js';
import authRouter from './routers/auth.js';
import aiRouter from './routers/aiRouter.js';
import cors from 'cors';
// import connection from './connection.js'; // Import the database connection

const app = express();

const port = 5000;

//middlewares
app.use(cors({
   origin: '*',
   credentials: true
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use('/vendor', vendorRouter);
app.use('/scrap-request', scrapRouter);
app.use('/car', carRouter);
app.use('/ai', aiRouter);
app.use('/api/auth', authRouter);

// starting the server
app.listen(port, () => {
   console.log('express server has started');
});