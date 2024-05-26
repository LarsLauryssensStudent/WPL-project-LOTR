import express, { Express } from "express";
import { login, register, updateEmail, updatePassword } from "../database";
import { User } from "../interfaces";
import cookieParser from "cookie-parser";

export default function loginRouter() {
    const router = express.Router();
    router.use(cookieParser());

    router.get("/login", async (req, res) => {
        const savedUsername = req.session.rememberedUsername || "";
        if (!req.session.user) {
            res.render("login/login", { 
                pageTitle: "login",
                savedUsername: savedUsername
            });
        } else {
            res.redirect("/selection")
        }
    });

    router.post("/login", async (req, res) => {
        const { username, password, rememberMe } = req.body;
        try {
            let user: User = await login(username, password);
            delete user.password;
            req.session.user = user;

            if (rememberMe) {
                req.session.rememberedUsername = username;
            } else {
                delete req.session.rememberedUsername;
            }

            req.session.message = { type: "success", message: "Login successful" };
            res.redirect("/selection");
        } catch (error: any) {
            req.session.message = { type: "error", message: error.message };
            res.redirect("/login");
        }
    });

    router.post("/logout", async (req, res) => {
        delete req.session.user;
        res.redirect("/login");
    });

    router.get("/register", (req, res) => {
        if (!req.session.user) {
            res.render("login/register", { pageTitle: "register" });
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

    router.get("/forgotpassword", (req, res) => {
        res.render("login/forgotpassword", { pageTitle: "forgotpassword" });
    })

    return router;
}