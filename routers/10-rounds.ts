import express from "express";
import { fetchData, generatePossibleAnswers, shuffleArray } from "../utils";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds } from "../index";
import { Quote, Movie, Character } from "../interFaces";



export default function tenRoundsRouter() {
    const router = express.Router();


    router.get("/", async (req,res) => {
        if (getQCounter() > 10) {
            setQCounter(1);
            res.redirect("selection");
        }
        else {
            //quote randomen
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        const randomChars = generatePossibleAnswers(randomQuote, characters);
            // movie randomen
        const shuffledMovies = shuffleArray(movies);
        console.log(getQCounter());
        res.render("quizzNormal", {
                   
            backgroundUrl: tenRoundsBackgrounds[0],
            qCounter: getQCounter(),
            
            quote: randomQuote,
            characters: randomChars,
            movies: shuffledMovies
        });
        let current :number = getQCounter();
        current++;
        setQCounter(current);
    }
    })



    return router 
}