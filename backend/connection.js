const mogoose = required('mogoose');

const url = 'mongodb+srv://tripathiavinash860:1234@cluster0.69rg4nu.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0'


//  this is a asyncronous function - retrurns promise objects
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;