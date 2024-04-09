console.log("hello");
// EJS opbouw 07/04/2024
import express from "express";
import ejs from "ejs";



// vars
let gameMode :string = "selection";

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

app.get("selection/:option", (req, res)=>{
  let option: string = typeof req.params.option ==="string" ? req.params.option : "error";

  gameMode = "10-Rounds"
  let backgroundUrlNormal: string = "../images/10rounds/QuestionOne.jpg"
  if (option ==="10Rounds") {
  res.render("quizz", {
    gameMode: gameMode,
    backgroundUrl: backgroundUrlNormal
  });
}
  else {
    res.render("")
  }
});

app.get("/Sudden-Death",(req, res)=>{
  gameMode = "suddenDeath"
  res.render("quizz", {
    gameMode: gameMode
  })
});

app.get("/blacklist", (req, res)=>{
  res.render("blacklist");
});

app.get("/favorites",(req, res)=>{
  res.render("favorites")
});

app.listen(app.get("port"), () => {
  console.log(`Port running on ${app.get("port")}`);
});