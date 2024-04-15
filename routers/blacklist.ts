import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote, addToBlacklist, addToFavorites, getBlacklist } from "../index";
import { Character, Quote } from "../interfaces";
import { linkQuotes } from "../utils";
import { link } from "fs";

export default function blacklistRouter() {
    const blacklisted:Quote[] = getBlacklist();
    const characterIds: Character[] = linkQuotes(blacklisted, characters);
    const router = express.Router();
    router.get("/", (req, res) => {
        res.render("blacklist", {
            blacklisted: blacklisted
        });
        console.log(blacklisted[0].character);
        console.log(characterIds[0]._id);
    });
    return router
}
