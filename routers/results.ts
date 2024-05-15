import express from "express"
import { getScore } from "..";
import { getHighScore } from "../database";

export default function resultRouter() {
  const router = express.Router();

  router.get("/10-Rounds", (req, res) => {
    const score: number = getScore();
    //const highscore :number = getHighScore();
    let correctAnswers: number = score;
    res.render("results", {
      score: score,
      correctAnswers: correctAnswers
    })
  })

  router.get("/Sudden-Death", async (req, res) => {
    const score: number = getScore();
    let highscore: number = 0;
    let userName: string = req.session.user?.username ?? "test";
    //const highscore :number = getHighScore();
    try {
      highscore = await getHighScore(userName);
    }
    catch (error) {
      console.log(error);
    }
    let correctAnswers: number = score;
    res.render("resultsSD", {
      score: score,
      highScore: highscore,
      correctAnswers: correctAnswers
    })
  })

  return router;
}