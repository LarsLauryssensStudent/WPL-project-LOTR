import express from "express";
import { fetchData, generatePossibleAnswers, shuffleArray } from "../utils";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote, addToBlacklist, getBlacklist, getFavorites, toggleFavorites } from "../index";
import { Quote, Movie, Character } from "../interfaces";

export let score :number = 0;


export default function tenRoundsRouter() {
    const router = express.Router();

    router.get("/", async (req,res) => {
        if (getQCounter() > 10) {
            setQCounter(1);
            score = 0;
            res.redirect("selection");
        }
        else {
            if (getQCounter() === 1) {
                score = 0;
            }
            //quote randomen
        const randomQuote :Quote = returnQuote();
        const randomChars = generatePossibleAnswers(randomQuote, characters);
            // movie randomen
        const shuffledMovies = shuffleArray(movies);
        console.log(getQCounter());
        res.render("quizzNormal", {       
            backgroundUrl: tenRoundsBackgrounds[getQCounter() -1],
            qCounter: getQCounter(), 
            quote: randomQuote,
            characters: randomChars,
            movies: shuffledMovies,
            score:score
        });
      
    }
    })

    router.get("/check", async (req,res) => {
        let characterChoice :string = typeof req.query.actorRadio === "string" ? req.query.actorRadio : "";
        let movieChoice :string = typeof req.query.movieRadio === "string" ? req.query.movieRadio : "";
        console.log(characterChoice, movieChoice);
        let prevQuote :Quote = returnQuote();
        let correctChar :string = prevQuote.character;
        let correctMovie :string = prevQuote.movie;
        if (characterChoice === correctChar) {
            score += 1;
        }
        if (movieChoice === correctMovie) {
            score += 1;
        }
      

        setNewQuote(quotes);
        let current :number = getQCounter();
        current++;
        setQCounter(current);
        
        res.redirect("/10-Rounds");
        

    })

    router.get("/blacklist", (req,res) => {
        let currentQuote :Quote = returnQuote();
        addToBlacklist(currentQuote);
        setNewQuote(quotes);
        console.log(getBlacklist());
        res.redirect("/10-Rounds");      
    })
    router.get("/favorites", (req,res) => {
        let currentQuote :Quote = returnQuote();
        let favorites : Quote[] = getFavorites();
        toggleFavorites(currentQuote);
        res.redirect("/10-Rounds");

    });

    return router 
}