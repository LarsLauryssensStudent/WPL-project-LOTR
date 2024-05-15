import express from "express";
import { shuffleArray, generatePossibleAnswers } from "../utils";
import { getQCounter, setQCounter, returnQuote, setNewQuote, setScore, updateCurrentGameAnswers, updateCurrentGameQuote, updateCurrentGameScore, resetCurrentGame, getCurrentGame } from "../index";
import { Quote, Movie, Character, User, GameResult } from "../interfaces";
import { getCharacters, getMovies, getQuotes, addToBlacklist, getBlacklist, toggleFavorites, updateHighscore, getHighScore, addToGames } from "../database";
import { userInfo } from "os";


export default function suddenDeathRouter() {
    const router = express.Router();


    router.get("/", async (req, res) => {
        const randomQuote: Quote = returnQuote();
        let characters: Character[] = [];
        let movies: Movie[] = [];
        let score: number = 0;
        let userName: string = req.session.user?.username ?? "test";
        try {
            characters = await getCharacters();
            movies = await getMovies();
            score = await getHighScore(userName);
        } catch (error) {
            console.log("Er ging iets fout bij Sudden Death: " + error)
        }
        const randomChars: Character[] = generatePossibleAnswers(randomQuote, characters);
        // movie randomen
        console.log(getQCounter());
        res.render("quizzSD", {
            qCounter: getQCounter(),
            score: score,
            quote: randomQuote,
            characters: randomChars,
            movies: movies
        });

    });

    router.post("/blacklist", async (req, res) => {
        const reason: string = typeof req.body.reason === "string" ? req.body.reason : "test";
        const userId: string = req.session.user?.username ?? "test";
        const currentQuote = returnQuote();
        try {
            console.log(userId);
            currentQuote.reason = reason;
            await addToBlacklist(currentQuote, userId);
            let quotes: Quote[] = await getQuotes();
            setNewQuote(quotes);
            console.log(await getBlacklist(userId));
        }
        catch (error) {
            console.log(error);
        }

        res.redirect("/Sudden-Death");
    });


    router.get("/check", async (req, res) => {
        let characterChoice: string = typeof req.query.actorRadio === "string" ? req.query.actorRadio : "";
        let movieChoice: string = typeof req.query.movieRadio === "string" ? req.query.movieRadio : "";
        console.log(characterChoice, movieChoice);
        let prevQuote: Quote = returnQuote();
        let correctChar: string = prevQuote.character;
        let correctMovie: string = prevQuote.movie;
        updateCurrentGameAnswers(movieChoice, characterChoice);
            updateCurrentGameQuote(prevQuote);
            updateCurrentGameScore(getQCounter());
        if (correctChar === characterChoice && correctMovie === movieChoice) {
            let currentSD: number = getQCounter();
            try {
                let userId: string = req.session.user?.username ?? "test";
                await updateHighscore(userId, currentSD);
            } catch(error) {
                console.log(error);
            }
            currentSD++;
            setQCounter(currentSD);
            let quotes: Quote[] = await getQuotes();
            setNewQuote(quotes);
            
            

            res.redirect("/Sudden-Death");
        }
        else {
            setQCounter(1);
            let userName: string = req.session.user?.username ?? "test";
            let currentScore: number = await getHighScore(userName);
            let highScore: number = req.session.user?.highScore ?? 0;
            let gameResult: GameResult = getCurrentGame();
            try {
                await addToGames(userName, gameResult);
            } catch(error) {
                console.log(error);
            }
            resetCurrentGame();
            if (currentScore > highScore) {
                await updateHighscore(userName, currentScore);
                setScore(currentScore);
            }
            res.redirect("/results/Sudden-Death");

        }

    })
    router.get("/blacklist", async (req, res) => {
        let currentQuote: Quote = returnQuote();
        let userId = "test";
        try {
            await addToBlacklist(currentQuote, userId);
            let quotes: Quote[] = await getQuotes();
            setNewQuote(quotes);
            console.log(await getBlacklist(userId));
        }
        catch (error) {
            console.log(error);
        }
        res.redirect("/Sudden-Death");
    })
    router.get("/favorites", async (req, res) => {
        let currentQuote: Quote = returnQuote();
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