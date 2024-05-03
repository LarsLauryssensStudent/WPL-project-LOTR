import express from "express";
import { shuffleArray, generatePossibleAnswers } from "../utils";
import { getQCounter, setQCounter, returnQuote, setNewQuote } from "../index";
import { Quote, Movie, Character, User } from "../interfaces";
import { getCharacters, getMovies, getQuotes, addToBlacklist, getBlacklist, toggleFavorites } from "../database";


export default function suddenDeathRouter() {
    const router = express.Router();


    router.get("/", async (req,res) => {
        const randomQuote : Quote = returnQuote();
        let characters : Character[] = [];
        let movies : Movie[] = [];
        try {
        characters = await getCharacters();
        movies = await getMovies();    
        }catch (error) {
            console.log("Er ging iets fout bij 10-Rounds: " + error )
        }
        const randomChars :Character[] = generatePossibleAnswers(randomQuote, characters);
            // movie randomen
        console.log(getQCounter());
        res.render("quizzSD", {
            qCounter: getQCounter(),
            score: 0,
            quote: randomQuote,
            characters: randomChars,
            movies: movies
        });
    
    })


    router.get("/check", async (req,res) => {
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
            let quotes: Quote[] = await getQuotes();
            setNewQuote(quotes);

            res.redirect("/Sudden-Death");
        }
        else {
            setQCounter(1);
            res.redirect("/selection");
        }
        
    })
    router.get("/blacklist", async (req,res) => {
        let currentQuote :Quote = returnQuote();
        let userId = "test";
        try {
        await addToBlacklist(currentQuote, userId);
        let quotes :Quote[] = await getQuotes();
        setNewQuote(quotes);
        console.log(await getBlacklist(userId));
        }
        catch (error) {
            console.log(error);
        }
        res.redirect("/Sudden-Death");      
    })
    router.get("/favorites", async (req,res) => {
        let currentQuote :Quote = returnQuote();
        let userId = "test"; 
        try {
            await toggleFavorites(currentQuote, userId);
            console.log("Succes Fav")
        }
        catch (error) {
            console.log(error);
        }
        console.log("ben hier");
        res.redirect("/Sudden-Death");
    });

    return router 
}