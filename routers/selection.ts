import express from "express";
import { resetCurrentGame, setQCounter, setScore } from "../index";
export default function selectionRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {           
        setQCounter(1);
        res.render("selection", {
        
        });
      
    });
    
    router.get("/goToNormal", (req,res) => {
        setScore(0);
        setQCounter(1);
        res.redirect("/10-Rounds");
    });

    router.get("/goToSD", (req,res) => {
        setScore(0);
        res.redirect("/Sudden-Death");        
    });


    router.get("/:option", (req, res) => {
        const option: string = typeof req.params.option === "string" ? req.params.option : "error";
        console.log(option);
        setQCounter(1);
        if (option === "10-Rounds") {
                setScore(0);
                resetCurrentGame();
                res.redirect("/10-Rounds");
            } else {
                setScore(0);
                resetCurrentGame();
                res.redirect("/Sudden-Death");
            }
      
});

    


    return router;
}