import express from "express";
import { fetchData } from "../utils";
import { setQCounter } from "../index";
export default function selectionRouter() {
    const router = express.Router();

    router.get("/", async (req, res) => {           
        setQCounter(1);
        res.render("selection", {
        
        });
      
});
      
    router.get("/:option", (req, res) => {
        const option: string = typeof req.params.option === "string" ? req.params.option : "error";
        console.log(option);
        setQCounter(1);
        if (option === "10-Rounds") {
                
                res.redirect("/10-Rounds");
            } else {
                res.redirect("/Sudden-Death");
            }
      
});
    return router;
}