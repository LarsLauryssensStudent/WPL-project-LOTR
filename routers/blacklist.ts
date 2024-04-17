import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote, addToBlacklist, getBlacklist } from "../index";
import { Character, Quote } from "../interfaces";
import { link } from "fs";

export default function blacklistRouter() {
    const router = express.Router();


    const blacklisted: Quote[] = getBlacklist();
    router.get("/", (req, res) => {
        let charactersss: Character[] | undefined = toggleIds();
        res.render("blacklist", {
            blacklisted: blacklisted,
            characters: characters
        });
    });
    return router
}

function toggleIds(): Character[] {
    const blacklisted: Quote[] = getBlacklist();
    const characterIds: string[] = blacklisted.map(quote => quote.character);
    let characterss: Character[] = [];

    characterIds.forEach(characterId => {
        const foundCharacter = characters.find(char => char._id === characterId);
        if (foundCharacter) {
            characterss.push(foundCharacter);
            console.log(foundCharacter);
        }
    });

    return characterss;
}