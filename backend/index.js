const express = require('express');
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const vendorRouter = require('./routers/vendorRouter')
const carRouter = require('./routers/carRouter')
const cors = require('cors');

const app = express();

const port = 5000;

//middlewares
app.use(cors({
   origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/vendor', vendorRouter);
app.use('/car', carRouter);

// starting the server
app.listen(port, () => {
   console.log('express server has started');
});