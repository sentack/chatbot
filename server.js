import express from "express";
import main from "./ai.js";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// The following chatHistory arrays are used to save the history of the chat between the user and the chatbot
// One is fully in ENglish for chatgpt to keep track of the history
// The second one is in the preferred language of the user. to show the chat history to the user
export let chatHistory = [];
export let chatHistory2 = [];

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Use cookie-parser middleware
app.use(cookieParser());

// index page
app.get("/", function (req, res) {
  chatHistory2 = req.cookies.chatHistory2 || [];
  res.render("pages/index", {
    chatHistory: chatHistory2,
  });
});

app.post("/", (req, res) => {
  const question = req.body.question;
  chatHistory = req.cookies.chatHistory || [];
  chatHistory2 = req.cookies.chatHistory2 || [];
  main(question)
    .then(() => {
      res.cookie("chatHistory", chatHistory);
      res.cookie("chatHistory2", chatHistory2);
      res.render("pages/index", {
        chatHistory: chatHistory2,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.put("/", (req, res) => {
  res.clearCookie("chatHistory");
  res.clearCookie("chatHistory2");
  res.sendStatus(200);
});

// about page
// app.get("/about", function (req, res) {
//   res.render("pages/about");
// });

app.listen(port, () => {
  console.log("Server started ");
});
