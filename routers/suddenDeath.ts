import express from "express";
import { shuffleArray, generatePossibleAnswers } from "../utils";
import { getQCounter, setQCounter, movies, quotes, characters } from "../index";
import { Quote, Movie, Character } from "../interfaces";

export default function suddenDeathRouter() {
    const router = express.Router();


    router.get("/", async (req,res) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        const randomChars = generatePossibleAnswers(randomQuote, characters);
            // movie randomen
        const shuffledMovies = shuffleArray(movies);
        console.log(getQCounter());
        res.render("quizzSD", {
            qCounter: getQCounter(),
            score: 0,
            quote: randomQuote,
            characters: randomChars,
            movies: shuffledMovies
        });
        let currentSD :number = getQCounter();
        currentSD++;
        setQCounter(currentSD);
    })


    router.get("/check", (req,res) => {
               
        res.redirect("/");
    })



    return router 
}