// EJS opbouw 07/04/2024
import express from "express";
import { MongoClient } from "mongodb";
import selectionRouter from "./routers/selection";
import tenRoundsRouter from "./routers/10-rounds";
import suddenDeathRouter from "./routers/suddenDeath";
import { fetchData, fullQuotes, trimCharacters, trimMovies } from "./utils";
import { Character, Movie, Quote } from "./interfaces";
import blacklistRouter from "./routers/blacklist";
import favoritesRouter from "./routers/favorites";
import landingpageRouter from "./routers/landingpage";


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
let blackListed: Quote[] = [];
let favorites: Quote[] = [];

// vars
// let gameMode :string = "selection";
let qCounter: number = 0;
let randomQuote: Quote;
// let userScore :number = 0;
//index export functies

export function setQCounter(value: number) {
  qCounter = value;
}
export function getQCounter() {
  return qCounter;
}
export function setNewQuote(array: Quote[]) {
  let randomIndex: number = Math.floor(Math.random() * quotes.length);
  randomQuote = array[randomIndex];
}
export function returnQuote(): Quote {
  return randomQuote;
}
export function getBlacklist(): Quote[] {
  return blackListed;
}
export function addToBlacklist(quote: Quote) {
  blackListed.push(quote);
}
export function getFavorites(): Quote[] {
  return favorites;
}
export function addToFavorites(quote: Quote) {
  favorites.push(quote);
}
export function removeQuoteFavs(array:Quote[], quote:Quote) {
  favorites = array.filter(element => element !== quote);
}

//monogdb
const uri = "mongodb+srv://vandevkieboom:vandenkieboom1996@webontwikkeling.vk1mlnn.mongodb.net/?retryWrites=true&w=majority&appName=webontwikkeling";
export const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase().catch(console.error);


//express
const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }))


//routes
app.use("/", landingpageRouter());
app.use("/selection", selectionRouter());
app.use("/10-Rounds", tenRoundsRouter());
app.use("/Sudden-Death", suddenDeathRouter());
app.use("/Blacklist", blacklistRouter());
app.use("/Favorites", favoritesRouter());


//startup
app.listen(app.get("port"), async () => {
  try {
    const data: any = await fetchData();

    quotes = await fullQuotes(data.quotesTT, data.quotesFS, data.quotesRK);
    characters = await trimCharacters(data.characters, quotes);
    movies = await trimMovies(data.movies, quotes);
    setNewQuote(quotes);

    console.log(`Port running on ${app.get("port")}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(`Port running on ${app.get("port")}`);
  }
});
