import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote, addToBlacklist, getBlacklist } from "../index";
import { Character, Quote } from "../interfaces";
import { link } from "fs";

export default function blacklistRouter() {
    const router = express.Router();


    const blacklisted: Quote[] = getBlacklist();
    router.get("/", (req, res) => {
        res.render("blacklist", {
            blacklisted: blacklisted,
            characters: characters
        });
    });

    router.get("checkBl", (req, res) => {
        const name = 
    });

    return router
}
