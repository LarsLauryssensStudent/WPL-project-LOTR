import express, { Express } from "express";
import { login, register } from "../database";
import { User } from "../interfaces";

export default function loginRouter() {
    const router = express.Router();

    router.get("/login", async (req, res) => {
        if (!req.session.user) {
            res.render("login/login");
        } else {
            res.redirect("/selection")
        }
    });

    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            let user: User = await login(username, password);
            delete user.password;
            req.session.user = user;

            req.session.message = { type: "success", message: "Login successful" };
            res.redirect("/selection");
        } catch (error: any) {
            req.session.message = { type: "error", message: error.message };
            res.redirect("/login");
        }
    });

    router.post("/logout", async (req, res) => {
        req.session.destroy(() => {
            res.redirect("/login");
        });
    });

    router.get("/register", (req, res) => {
        if (!req.session.user) {
            res.render("login/register");
        } else {
            res.redirect("/selection")
        }
    });

    router.post("/register", async (req, res) => {
        const { signupUsername, signupEmail, signupPassword, repeatPassword } = req.body;
        try {
            await register(signupUsername, signupEmail, signupPassword, repeatPassword);
            req.session.message = { type: "success", message: "Register successful" };
            res.redirect("/login");
        } catch (error: any) {
            req.session.message = { type: "error", message: error.message };
            res.redirect("/register");
        }
    });

    return router;
}