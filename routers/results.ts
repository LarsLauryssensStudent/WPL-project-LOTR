import express from "express"
import { getScore } from "..";

export default function resultRouter() {
  const router = express.Router();

  router.get("/", (req,res) => {
    const score : number = getScore();
    //const highscore :number = getHighScore();
    let correctAnswers :number = score /2;
    res.render("results", {
      score: score,
      correctAnswers: correctAnswers
    })
})
  return router;
}