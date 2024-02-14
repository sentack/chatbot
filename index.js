import { Configuration, OpenAI} from "openai";
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OpenAI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function main(){
    
}
