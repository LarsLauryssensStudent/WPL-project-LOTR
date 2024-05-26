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
import quotesRouter from "./routers/quotes";
import loginRouter from "./routers/loginRouter";
import settingsRouter from "./routers/settingsRouter";

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
let currentGame: GameResult = {
  lastQuotes: [],
  lastCharacters: [],
  lastMovies: [],
};
let userScore: number = 0;

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
export function updateCurrentGameQuote(value : Quote) {
  currentGame.lastQuotes?.push(value);
}
export function updateCurrentGameAnswers(valueOfMovie: string, valueOfChar: string){
  currentGame.lastMovies?.push(valueOfMovie);
  currentGame.lastCharacters?.push(valueOfChar);
}
export function updateCurrentGameScore(score: number) {
  currentGame.score = score;
}
export function resetCurrentGame() {
  currentGame.lastCharacters = [],
  currentGame.lastMovies = [],
  currentGame.lastQuotes = [],
  currentGame.score = 0
}
export function getCurrentGame(): GameResult {
  return currentGame;
}
export function setScore(score: number) {
  userScore = score;
}
export function getScore(): number {
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
app.use(secureMiddleware, settingsRouter());
app.use("/selection", secureMiddleware, selectionRouter());
app.use("/10-Rounds", secureMiddleware, tenRoundsRouter());
app.use("/Sudden-Death", secureMiddleware, suddenDeathRouter());
app.use("/Blacklist", secureMiddleware, blacklistRouter());
app.use("/Favorites", secureMiddleware, favoritesRouter());
app.use("/results", resultRouter())
app.use("/quotes", quotesRouter());

//startup

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/selection");
  } else {
    res.render("index", { pageTitle: "Landingspagina" });
  }
})

app.listen(app.get("port"), async () => {
  try {
      await connect();
      await checkData();
      let quotes : Quote[] = await getQuotes();
      setNewQuote(quotes);
      console.log("Server started on http://localhost:" + app.get("port"));
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
});
