import express from "express";
import { generatePossibleAnswers } from "../utils";
import { getQCounter, setQCounter, returnQuote, setNewQuote, setScore, updateCurrentGameAnswers, updateCurrentGameQuote, updateCurrentGameScore, resetCurrentGame, getCurrentGame, getScore } from "../index";
import { Quote, Movie, Character, User, GameResult } from "../interfaces";
import { getCharacters, getMovies, getQuotes, addToBlacklist, getBlacklist, toggleFavorites, updateHighscore, getHighScore, addToGames, getFavorites } from "../database";



export default function suddenDeathRouter() {
    const router = express.Router();


    router.get("/", async (req, res) => {
        try {
            const randomQuote: Quote = returnQuote();
            const characters: Character[] = await getCharacters();
            const movies: Movie[] = await getMovies();
            const userName: string = req.session.user?.username ?? "test";
            const highScore: number = await getHighScore(userName);

            const randomChars: Character[] = generatePossibleAnswers(randomQuote, characters);
            const favorites: Quote[] = await getFavorites(userName);
            res.render("quizzSD", {
                qCounter: getQCounter(),
                score: highScore,
                quote: randomQuote,
                characters: randomChars,
                movies: movies,
                pageTitle: "Sudden-Death",
                favorites: favorites
            });
        } catch (error) {
            console.error("Error in Sudden Death initialization: ", error);
            res.status(500).send("Internal Server Error");
        }

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
            setScore(currentSD);
            currentSD++;

            setQCounter(currentSD);
            let quotes: Quote[] = await getQuotes();
            setNewQuote(quotes);

            res.redirect("/Sudden-Death");
        }
        else {
            setQCounter(1);
            let userName: string = req.session.user?.username ?? "test";
            let currentScore: number = getScore();
            let highScore: number = await getHighScore(userName);
            console.log(currentScore, highScore);
            console.log(req.session.user?.highScore?.toLocaleString());
            let gameResult: GameResult = getCurrentGame();
            try {
                await addToGames(userName, gameResult);
            } catch (error) {
                console.log(error);
            }
            resetCurrentGame();

            if (currentScore > highScore) {
                console.log("current:" + currentScore + "  high: " + highScore)
                await updateHighscore(userName, currentScore);
                req.session.user!.highScore = currentScore;
                console.log(req.session.user?.highScore);

                console.log(await getHighScore(userName));

            }

            res.redirect("/results/Sudden-Death");

        }

    })
    router.get("/blacklist", async (req, res) => {
        let currentQuote: Quote = returnQuote();
        let userId: string = req.session.user?.username ?? "test";

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
        let userId: string = req.session.user?.username ?? "test";

        try {
            await toggleFavorites(currentQuote, userId);
            console.log("Succes Fav")
        }
        catch (error) {
            console.log(error);
        }
        console.log("ben hier");
        res.redirect("back");
    });

    return router
}