import express from "express";

export default function favoritesRouter() {
    const router = express.Router();

    router.get("/",(req, res)=>{
        res.render("favorites")
      });

    return router;
}