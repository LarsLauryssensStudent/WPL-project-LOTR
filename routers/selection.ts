import express from "express";

export default function selectionRouter() {
    const router = express.Router();
    let gameMode: string = "selection";

    router.get("/", (req, res) => {
        gameMode = "Selection";
        res.render("selection", {
            gameMode: gameMode
        });
    });

    router.get("/:option", (req, res) => {
        try {
            const option: string = req.params.option || "error";
            let backgroundUrlNormal: string = "../images/10rounds/QuestionOne.jpg";

            switch (option) {
                case "10rounds":
                    gameMode = "10-Rounds";
                    res.render("10rounds", {
                        gameMode: gameMode,
                        backgroundUrl: backgroundUrlNormal
                    });
                    break;
                case "sudden-death":
                    gameMode = "suddenDeath";
                    res.render("sudden-death", {
                        gameMode: gameMode
                    });
                    break;
                default:
                    throw new Error("Invalid option");
            }
        } catch (error: any) {
            res.status(404).send(error.message + " voorbeeld");
        }
    });

    return router;
}
