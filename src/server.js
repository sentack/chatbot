import express from 'express';
import main from './ai.js';
import bodyParser from 'body-parser';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});


app.set('view engine', 'ejs');

export const chatHistory = [];
export const chatHistory2 = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))


// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('A client connected.');


  // Handle disconnections
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});


// index page
app.get('/', function(req, res) {
    res.render('pages/index', {
        chatHistory: chatHistory2
    });
  });
  
  // about page
  app.get('/about', function(req, res) {
    res.render('pages/about');
  });


app.post('/', (req,res)=>{
    const question = req.body.name;
    main(question);    
    res.render("pages/index", {
        chatHistory: chatHistory2
    });
})


app.listen(port, ()=>{
    console.log('Server started ')
});

async function callMain(question) {
    const result = await main(question);
    console.log(result);
}
