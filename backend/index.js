const expres = require('express');
const userRouter = require('./routers/userRouter')

const app = expres();

const port = 5000;

//middlewares
app.use(expres.json());
app.use('/user',userRouter);

//router
app.get('/',(req,res) => {
    res.send('response from express')
})
app.get ('/',(req,res) => {
   res.send('response from express');
});
//add
app.get ('/add',(req,res) => {
   res.send('response from add');
});
//update
app.get ('/update',(req,res) => {
   res.send('response from update');
});
//delet
app.get ('/delete',(req,res) => {
   res.send('response from delete');
});

// starting the server
app.listen(port,() => {
    console.log('express server has started');
    
});