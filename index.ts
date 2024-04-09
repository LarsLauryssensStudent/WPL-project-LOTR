// EJS opbouw 07/04/2024
import express from "express";
import ejs from "ejs";

//qoute arrays
let characters: object[] = [];
let quotes: object[] = [];
let movies: object[] = [];

let rawQuotes :object[] =[]
// vars
let gameMode :string = "selection";
let qCounter :number = 0;
let userScore :number = 0;

const app = express();

app.set("port", 3000);
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
  res.render("index.ejs");
});

app.get("/selection",(req, res)=>{
  gameMode = "Selection";
  res.render("selection",{
    gameMode: gameMode
  })
});

app.get("/selection/:option", (req, res)=>{
  let option: string = typeof req.params.option ==="string" ? req.params.option : "error";
  userScore = 0;
  gameMode = "10-Rounds"
  let backgroundUrlNormal: string = "../assets/images/10rounds/QuestionOne.jpg"
  if (option ==="10Rounds") {
    qCounter = 0;
    
  res.render("quizzNormal", {
    gameMode: gameMode,
    backgroundUrl: backgroundUrlNormal,
    qCounter: qCounter,
    score: userScore
  });
}
  else {
    res.render("quizzSuddenDeath", {
      qCounter: qCounter
    })
  }
});


app.get("/blacklist", (req, res)=>{
  res.render("blacklist");
});

app.get("/favorites",(req, res)=>{
  res.render("favorites")
});

app.listen(app.get("port"), async () => {
  const token = 'mIqYC2hqv_DXksfzJsvn '; 
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  let dataQuotes: any = await fetch("https://the-one-api.dev/v2/quote", {headers});
  rawQuotes = await dataQuotes.json();
  let dataChars: any = await fetch("https://the-one-api.dev/v2/character", {headers});
  characters = await dataChars.json();
  let dataMovies: any = await fetch("https://the-one-api.dev/v2/movie", {headers}); 
  movies = await dataMovies.json();
  console.log(rawQuotes);

  console.log(`Port running on ${app.get("port")}`);
});