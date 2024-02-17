import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';
import { translate } from '@vitalets/google-translate-api';
import chatHistory from './form.js'


async function main(question){

    const { text } = await translate(question, { to: 'en' });
    const userInput = text;        

    try{
        const messages = chatHistory.map(([role, content]) => ({role, content}));

        messages.push({role: 'user', content: userInput})

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });
            
        const completionText = chatCompletion.choices[0].message.content;            

        chatHistory.push(['user', userInput]);
        chatHistory.push(['assistant', completionText]);

        if (userInput.toLowerCase() == 'exit'){
            return;
        }

        return completionText;

    }catch(error){
        console.log(colors.red(error));
    }
}


export default main;