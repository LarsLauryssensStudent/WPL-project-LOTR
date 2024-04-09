// EJS opbouw 07/04/2024
import express from "express";
import selectionRouter from "./routers/selection";


// qoute arrays
// let characters: object[] = [];
// let quotes: object[] = [];
// let movies: object[] = [];
// let rawQuotes :object[] =[]


// vars
// let gameMode :string = "selection";
// let qCounter :number = 0;
// let userScore :number = 0;


const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))


//routes
app.use("/selection", selectionRouter());


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
  console.log(`Port running on ${app.get("port")}`);
});