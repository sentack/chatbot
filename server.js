import express from 'express';
import main from './ai.js';
import bodyParser from 'body-parser';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import cookieParser from 'cookie-parser';



const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

export let chatHistory = [];
export let chatHistory2 = [];

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
// Use cookie-parser middleware
app.use(cookieParser());


// index page
app.get('/', function(req, res) {
  chatHistory2 = req.cookies.chatHistory2 || [];
    res.render('pages/index', {
        chatHistory: chatHistory2
    });
  });
  
  // about page
  app.get('/about', function(req, res) {
    res.render('pages/about');
  });


app.post('/', (req,res)=>{
  const question = req.body.question;
  chatHistory = req.cookies.chatHistory || [];  
  chatHistory2 = req.cookies.chatHistory2 || [];
  main(question)
    .then(() => {
      res.cookie('chatHistory', chatHistory);
      res.cookie('chatHistory2', chatHistory2);
      res.render("pages/index", {
        chatHistory: chatHistory2
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
})


app.listen(port, ()=>{
    console.log('Server started ')
});

