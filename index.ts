// EJS opbouw 07/04/2024
import express, { Express } from "express";
import { checkData, connect, getQuotes, port } from "./database";
import { Character, GameResult, Movie, Quote } from "./interfaces";
import selectionRouter from "./routers/selection";
import tenRoundsRouter from "./routers/10-rounds";
import suddenDeathRouter from "./routers/suddenDeath";
import blacklistRouter from "./routers/blacklist";
import favoritesRouter from "./routers/favorites";
import landingpageRouter from "./routers/landingpage";
import resultRouter from "./routers/results";


//arrays
export let characters: Character[] = [];
export let quotes: Quote[] = [];
export let movies: Movie[] = [];
// let rawQuotes :object[] =[]
export let tenRoundsBackgrounds: string[] = [
  "../assets/images/10rounds/QuestionOne.jpg",
  "../assets/images/10rounds/lotr-background-hobbiton.jpg",
  "../assets/images/10rounds/lotr-background-rivendell.jpg",
  "../assets/images/10rounds/lotr-background-fangorn-forest-2.jpg",
  "../assets/images/10rounds/lotr-background-journey-02.jpg",
  "../assets/images/10rounds/lotr-background-rivendell-2.jpg",
  "../assets/images/10rounds/lotr-background-mines-of-moria-2.jpg",
  "../assets/images/10rounds/lotr-background-mines-of-moria.jpg",
  "../assets/images/10rounds/lotr-background-almost-mordor.jpg",
  "../assets/images/10rounds/lotr-background-mordor.jpg"
]


// vars
// let gameMode :string = "selection";
let qCounter: number = 0;
let randomQuote: Quote;
let currentGame: GameResult;
let userScore :number = 0;

//index export functies

export function setQCounter(value: number) {
  qCounter = value;
}
export function getQCounter() {
  return qCounter;
}
export function setNewQuote(array: Quote[]) {
  let randomIndex: number = Math.floor(Math.random() * array.length);
  randomQuote = array[randomIndex];
}
export function returnQuote(): Quote {
  return randomQuote;
}
  
export function setScore(score :number) {
  userScore = score;
}
export function getScore() :number {
  return userScore
}


//express
const app: Express = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }))


//routers
app.use("/", landingpageRouter());
app.use("/selection", selectionRouter());
app.use("/10-Rounds", tenRoundsRouter());
app.use("/Sudden-Death", suddenDeathRouter());
app.use("/Blacklist", blacklistRouter());
app.use("/Favorites", favoritesRouter());
app.use("/results", resultRouter())


//startup
app.listen(port, async () => {
  await connect();
  console.log(`Server started on http://localhost:${port}`);

  try {
    await checkData();
    let quotes: Quote[] = await getQuotes();
    setNewQuote(quotes);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
