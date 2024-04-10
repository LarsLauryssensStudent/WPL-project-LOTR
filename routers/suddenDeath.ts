import express from "express";
import { fetchData } from "../utils";
import { getQCounter, setQCounter, movies, quotes1, quotes2, quotes3, characters, tenRoundsBackgrounds } from "../index";
import { Quote, Movie, Character } from "../interFaces";

export default function suddenDeathRouter() {
    const router = express.Router();


    router.get("/", async (req,res) => {
        let quote :Quote | null = null;
        res.render("quizzSD", {
            qCounter: getQCounter(),
            score: req.app.locals.userScore,
            quote: quote,
            characters,
            movies
        });
    })



    return router 
}