import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote } from "../index";
import { Quote } from "../interfaces";
import { getFavorites } from "../database";

export default function favoritesRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {
        let userId = "test";
        const favorites: Quote[] = await getFavorites(userId);
        res.render("favorites",
            {
                characters: characters,
                favorites: favorites
            })
    });
    return router
}