import express from "express";
import { shuffleArray, generatePossibleAnswers } from "../utils";
import { getQCounter, setQCounter, movies, quotes, characters, returnQuote, setNewQuote, addToBlacklist, getBlacklist, toggleFavorites } from "../index";
import { Quote, Movie, Character } from "../interfaces";

export default function suddenDeathRouter() {
    const router = express.Router();


    router.get("/", async (req,res) => {
        let randomQuote : Quote = returnQuote();
        let randomChars :Character[] = generatePossibleAnswers(randomQuote, characters);
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
    
    })


    router.get("/check", (req,res) => {
        let characterChoice :string = typeof req.query.actorRadio === "string" ? req.query.actorRadio : "";
        let movieChoice :string = typeof req.query.movieRadio === "string" ? req.query.movieRadio : "";
        console.log(characterChoice, movieChoice);
        let prevQuote :Quote = returnQuote();
        let correctChar :string = prevQuote.character;
        let correctMovie :string = prevQuote.movie;
        if (correctChar === characterChoice && correctMovie === movieChoice) {
            let currentSD :number = getQCounter();
            currentSD++;
            setQCounter(currentSD);
            setNewQuote(quotes);

            res.redirect("/Sudden-Death");
        }
        else {
            setQCounter(1);
            res.redirect("/selection");
        }
        
    })
    router.get("/blacklist", (req,res) => {
        let currentQuote :Quote = returnQuote();
        addToBlacklist(currentQuote);
        setNewQuote(quotes);
        console.log(getBlacklist());
        res.redirect("/Sudden-Death");      
    })
    router.get("/favorites", (req,res) => {
        let currentQuote :Quote = returnQuote();
        toggleFavorites(currentQuote);
        console.log("ben hier");
        res.redirect("/Sudden-Death");
    });

    return router 
}