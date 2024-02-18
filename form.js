import express from 'express';
import main from './index.js';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');

const chatHistory = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// index page
app.get('/', function(req, res) {
    res.render('pages/index', {
        chatHistory: chatHistory
    });
  });
  
  // about page
  app.get('/about', function(req, res) {
    res.render('pages/about');
  });


app.post('/', (req,res)=>{
    const question = req.body.name;
    callMain(question);
    res.render("pages/index", {
        chatHistory: chatHistory
    })
})


app.listen(port, ()=>{
    console.log('Server started ')
});

async function callMain(question) {
    const result = await main(question);
    console.log(result);
}


export default chatHistory;