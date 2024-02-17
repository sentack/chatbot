import express from 'express';
import main from './index.js';

const port = process.env.PORT || 5000;

const app = express();

const chatHistory = [];


app.use(express.json());

app.use(express.urlencoded());

app.get('/', (req,res)=>{
    res.sendFile('/public/index.html', { root: '.' });
})


app.post('/', (req,res)=>{
    const question = req.body.name;
    callMain(question);
})


app.listen(port, ()=>{
    console.log('Server started ')
});

async function callMain(question) {
    const result = await main(question);
    console.log(result);
}


export default chatHistory;