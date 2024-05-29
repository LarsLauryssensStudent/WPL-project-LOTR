import express from "express";
import { getBlacklist, getCharacters, getFavorites, getQuotes } from "../database";
import { Character, Quote } from "../interfaces";

export default function quotesRouter() {

    const router = express.Router();

    router.get("/blacklist/:id", async (req, res) => {
        let userId: string = req.session.user?.username ?? "test";

        const quotes: Quote[] = await getBlacklist(userId);

        const characterId: string = req.params.id;
        const quotesFromCharacter: Quote[] = quotes.filter(q => q.character === characterId);
        const character: Character[] = await getCharacters();
        const selectedCharacter: Character | undefined = character.find(char => char.id === characterId);
        res.render("allQuotes", {
            quotes: quotesFromCharacter,
            character: selectedCharacter,
            pageTitle: "all quotes"
        });
    });

    router.get("/favorites/:id", async (req, res) => {
        let userId: string = req.session.user?.username ?? "test";

        const quotes: Quote[] = await getFavorites(userId);

        const characterId: string = req.params.id;
        const quotesFromCharacter: Quote[] = quotes.filter(q => q.character === characterId);
        const character: Character[] = await getCharacters();
        const selectedCharacter: Character | undefined = character.find(char => char.id === characterId);
        res.render("allQuotes", {
            quotes: quotesFromCharacter,
            character: selectedCharacter,
            pageTitle: "all quotes"
        })
    })

    return router
}