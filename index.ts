// EJS opbouw 07/04/2024
import express from "express";
import selectionRouter from "./routers/selection";
import tenRoundsRouter from "./routers/10-rounds";
import suddenDeathRouter from "./routers/suddenDeath";
import { fetchData, fullQuotes, trimCharacters, trimMovies } from "./utils";
import { Character, Movie, Quote } from "./interFaces";


//arrays
export let characters: Character[] = [];
export let quotes1: Quote[] = [];
export let quotes2: Quote[] = [];
export let quotes3: Quote[] = [];
export let quotes: Quote[] = [];


export let movies: Movie[] = [];
// let rawQuotes :object[] =[]
export let tenRoundsBackgrounds :string[] = [
  "../assets/images/10rounds/lotr-background-rivendell.jpg",
  "",
  "",
  "",
  "",
  "",
  "",
]


// vars
// let gameMode :string = "selection";
let qCounter :number = 0;
// let userScore :number = 0;
export function setQCounter(value: number) {
  qCounter = value;
}

export function getQCounter() {
  return qCounter;
}

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))


//routes
app.use("/selection", selectionRouter());
app.use("/10-Rounds", tenRoundsRouter());
app.use("/Sudden-Death", suddenDeathRouter());


//index
app.get("/", (req, res)=>{
  res.render("index");
});


// app.get("/blacklist", (req, res)=>{
//   res.render("blacklist");
// });

// app.get("/favorites",(req, res)=>{
//   res.render("favorites")
// });


app.listen(app.get("port"), async () => {
  try {
  const data :any = await fetchData();
  
  quotes = fullQuotes(data.quotesTT, data.quotesFS, data.quotesRK);
  characters = trimCharacters(data.characters, quotes);
  movies = trimMovies(data.movies, quotes);
  
  console.log(`Port running on ${app.get("port")}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  console.log(`Port running on ${app.get("port")}`);

  }
});
