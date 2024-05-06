// EJS opbouw 07/04/2024
import express, { Express } from "express";
import { checkData, connect, getQuotes } from "./database";
import { Character, GameResult, Movie, Quote } from "./interfaces";
import { flashMiddleware } from "./middleware/flashMiddleware";
import { secureMiddleware } from "./middleware/secureMiddleware";
import dotenv from "dotenv";
import path from "path";
import session from "./middleware/session";
import selectionRouter from "./routers/selection";
import tenRoundsRouter from "./routers/10-rounds";
import suddenDeathRouter from "./routers/suddenDeath";
import blacklistRouter from "./routers/blacklist";
import favoritesRouter from "./routers/favorites";
import resultRouter from "./routers/results";
import loginRouter from "./routers/loginRouter";

dotenv.config();


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
app.use(session);
app.use(flashMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT ?? 3000);


//routers
app.use(loginRouter());
app.use("/selection", selectionRouter());
app.use("/10-Rounds", tenRoundsRouter());
app.use("/Sudden-Death", suddenDeathRouter());
app.use("/Blacklist", blacklistRouter());
app.use("/Favorites", favoritesRouter());
app.use("/results", resultRouter())

//startup

app.get("/", (req, res) => {
  res.render("index");
})

app.listen(app.get("port"), async () => {
  try {
      await connect();
      let quotes : Quote[] = await getQuotes();
      setNewQuote(quotes);
      console.log("Server started on http://localhost:" + app.get("port"));
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
});
