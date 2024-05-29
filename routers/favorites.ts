import express from "express";
import { Character, Quote } from "../interfaces";
import { getCharacters, getFavorites, removeFromFavorites } from "../database";
import { printFavoritesAndBlacklists } from "../utils";
import fs from "fs";
export default function favoritesRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {
        let userId :string = req.session.user?.username ?? "test";
        const favorites: Quote[] = await getFavorites(userId);
        const characters = await getCharacters();
        res.render("favorites",
            {
                characters: characters,
                favorites: favorites,
                pageTitle: "favorites",
            })
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
        let userId :string = req.session.user?.username ?? "test";
        

        await removeFromFavorites(quoteToRemove, userId);

        res.redirect("/Favorites");
    });

    router.get("/toFile", async (req,res) => {
        try {
            let username: string = req.session.user?.username ?? "test";
            let fileName: string = await printFavoritesAndBlacklists(username);

            res.download(fileName, (error) => {
                if (error) {
                    console.log(error);
                }

                fs.unlinkSync(fileName);
            })
        } catch (error) {
            res.status(500).redirect("back");
            console.log(error);
        }
    });

    return router
}