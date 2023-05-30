const express = require("express");
const mongoose=require("mongoose");
const DB="mongodb+srv://shivam316:pigmentation316@cluster0.kxg3ivw.mongodb.net/chatbot"
const User=require("./userschema");

mongoose.connect(DB ).then(()=>{
  console.log("Success");
}).catch((err)=>{console.log("error")});

const OPENAI_API_KEY = "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";
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});
app.post("/chat", (req, res) => {
  const question = req.body.question;
  const answer=req.body.answer;
  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 4000,
      temperature: 0,
    })
    .then((response) => {
      console.log({ response });
      return response?.data?.choices?.[0]?.text;
    })
    .then((answer) => {
      console.log({ answer });
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());

      return array;
    })
    .then((answer) => {
      res.json({
        answer: answer,
        propt: question,
      });
    });
  console.log({ question });
  console.log({answer});
  // const {usermessage,openaimessage}=req.body
  
  const user=new User({usermessage:req.body.question,openaimessage:req.body.answerrs});
  // user.save().then(()=>{
  //   res.status(201).json({message:"Done"});
  // }).catch((err)=> res.status(500).json({error: "failed database"}));
 
  user.save()

});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
