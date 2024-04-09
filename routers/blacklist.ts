import express from "express";

export default function blacklist() {
    const router = express.Router();

    router.get("/",(req, res)=>{
        res.render("blacklist")
      });

    return router;
}