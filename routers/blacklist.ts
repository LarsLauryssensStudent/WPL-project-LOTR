import express from "express";
import { getQCounter, setQCounter, movies, quotes, characters, tenRoundsBackgrounds, returnQuote, setNewQuote } from "../index";
import { Character, Quote } from "../interfaces";
import { fstat, link } from "fs";
import fs from "fs";
import { getBlacklist, getCharacters, removeFromBlacklist, searchQuoteById } from "../database";
import { userInfo } from "os";
import { printFavoritesAndBlacklists } from "../utils";
import { error } from "console";

export default function blacklistRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {
        let userId: string = req.session.user?.username ?? "test";

        const blacklisted: Quote[] = await getBlacklist(userId);

        let charactersss: Character[] | undefined = []
        const characters = await getCharacters();
        charactersss = await toggleIds(userId);
        res.render("blacklist", {
            blacklisted: blacklisted,
            characters: characters,
            pageTitle: "blacklist",
        });
    });

    router.get("/:id/Remove", async (req, res) => {
        const quoteId: string = req.params.id;

        let userId: string = req.session.user?.username ?? "test";
        let quoteToRemove: Quote | null = null;
        try {
            quoteToRemove = await searchQuoteById(quoteId);
        } catch (error) {
            console.log(error);
        }
        if (quoteToRemove) {
            await removeFromBlacklist(quoteToRemove, userId);
        }
        res.redirect("/Blacklist");
    });

    router.get("/toFile", async (req, res) => {
        try {
            let username: string = req.session.user?.username ?? "test";
            let fileName: string = await printFavoritesAndBlacklists(username);
            res.download(fileName, (error) => {
                if (error) {
                    console.log(error)
                }
                fs.unlinkSync(fileName);
            })
        } catch (error) {
            console.log(error);
        }
    });

    return router
}

async function toggleIds(userId: string): Promise<Character[]> {

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