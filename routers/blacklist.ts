import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote } from "../index";
import { Character, Quote } from "../interfaces";
import { link } from "fs";
import { getBlacklist, getCharacters, removeFromBlacklist } from "../database";
import { userInfo } from "os";

export default function blacklistRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {
        let userId = "test";
        const blacklisted: Quote[] = await getBlacklist(userId);
        let charactersss: Character[] | undefined = []
        const characters = await getCharacters();
        charactersss = await toggleIds();
        res.render("blacklist", {
            blacklisted: blacklisted,
            characters: characters
        });
    });

    router.get("/:id/Remove", async (req, res) => {
        const quoteId: string = req.params.id;
        const quoteToRemove: Quote = {
            id: quoteId,
            dialog: "",
            movie: "",
            character: "",
            id2: "",
        }
        const userId: string = "test";

        await removeFromBlacklist(quoteToRemove, userId);

        res.redirect("/Blacklist");
    });

    return router
}

async function toggleIds(): Promise<Character[]> {
    let userId = "test";
    const blacklisted: Quote[] = await getBlacklist(userId);
    const characterIds: string[] = blacklisted.map(quote => quote.character);
    let characterss: Character[] = [];

    characterIds.forEach(characterId => {
        const foundCharacter = characters.find(char => char.id === characterId);
        if (foundCharacter) {
            characterss.push(foundCharacter);
            console.log(foundCharacter);
        }
    });

    return characterss;
}