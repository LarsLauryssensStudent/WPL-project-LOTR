// EJS opbouw 07/04/2024
import express from "express";
import selectionRouter from "./routers/selection";
import blacklistRouter from "./routers/blacklist";
import favoritesRouter from "./routers/favorites";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))


//routes
app.use("/selection", selectionRouter());
app.use("/blacklist", blacklistRouter());
app.use("/favorites", favoritesRouter());


//index
app.get("/", (req, res)=>{
  res.render("index");
});


//start app
app.listen(app.get("port"), () => {
  console.log(`Port running on ${app.get("port")}`);
});