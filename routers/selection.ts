import express from "express";
import { fetchData } from "../utils";

export default function selectionRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const { quotes, characters, movies } = await fetchData();
            req.app.locals.gameMode = "selection";
            
            res.render("/", {
                gameMode: req.app.locals.gameMode,
                quotes,
                characters,
                movies
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).send("Error fetching data from API");
        }
    });
      
    router.get("/:option", async (req, res) => {
        const option: string = typeof req.params.option === "string" ? req.params.option : "error";
        req.app.locals.userScore = 0;
        req.app.locals.gameMode = "10-Rounds";
        let backgroundUrlNormal: string = "../assets/images/10rounds/QuestionOne.jpg";
    
        try {
            const { quotes, characters, movies } = await fetchData();
            
            if (option === "10Rounds") {
                req.app.locals.qCounter = 0;
                res.render("quizzNormal", {
                    gameMode: req.app.locals.gameMode,
                    backgroundUrl: backgroundUrlNormal,
                    qCounter: req.app.locals.qCounter,
                    score: req.app.locals.userScore,
                    quotes,
                    characters,
                    movies
                });
            } else {
                res.render("quizzSuddenDeath", {
                    qCounter: req.app.locals.qCounter,
                    quotes,
                    characters,
                    movies
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).send("Error fetching data from API");
        }
    });

    return router;
}