import express from "express";

export default function landingpageRouter() {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.render("index")
    });
    
    return router
}