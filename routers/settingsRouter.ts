import express, { Express } from "express";
import { updateEmail, updatePassword } from "../database";
import { secureMiddleware } from "../middleware/secureMiddleware";

export default function settingsRouter() {
    const router = express.Router();

    router.get("/email", secureMiddleware, async (req, res) => {
        res.render("login/changeemail", {
            pageTitle: "email"
        });
    });

    router.get("/password", secureMiddleware, async (req, res) => {
        res.render("login/changepassword", {
            pageTitle: "password"
        });
    });

    router.post("/email", async (req, res) => {
        const { newEmail, confirmEmail } = req.body;
        const currentEmail = req.session.user!.email;
        try {
            await updateEmail(currentEmail, newEmail, confirmEmail);
            req.session.user!.email = newEmail;

            req.session.message = { type: "success", message: "E-mail succesvol veranderd" };
            res.redirect("/email");
        } catch (error: any) {
            req.session.message = { type: "error", message: error.message };
            res.redirect("/email");
        }
    });

    router.post("/password", async (req, res) => {
        const { password, newPassword } = req.body;
        const currentEmail = req.session.user!.email;
        try {
            await updatePassword(currentEmail, password, newPassword);

            req.session.message = {
                type: "success", message: "Wachtwoord succesvol veranderd"
            };
            res.redirect("/password");
        } catch (error: any) {
            req.session.message = { type: "error", message: error.message };
            res.redirect("/password");
        }
    });

    return router;
}

