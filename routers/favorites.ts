import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote, addToBlacklist, getBlacklist, getFavorites } from "../index";
import { Quote } from "../interfaces";

export default function favoritesRouter() {
    const router = express.Router();

    router.get("/", (req, res) => {
        const favorites: Quote[] = getFavorites();
        res.render("favorites",
            {
                characters: characters,
                favorites: favorites
            })
    });
    return router
}