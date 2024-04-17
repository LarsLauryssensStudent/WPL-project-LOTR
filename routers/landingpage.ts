import express from "express";
import bcrypt from 'bcrypt';
import { client } from "../index";

export default function landingpageRouter() {
    const router = express.Router();
    const db = client.db("wpl-login");
    const users = db.collection("users");

    router.get("/", (req, res) => {
        res.render("index", { message: "" })
    });

    router.post("/login", async (req, res) => {
        const { loginEmail, loginPassword } = req.body;
    
        try {
            const user = await users.findOne({ email: loginEmail });
            if (!user) {
                return res.status(404).send("user not found");
            }
    
            const passwordMatch = await bcrypt.compare(loginPassword, user.password);
            if (passwordMatch) {
                return res.status(200).render("index", { message: "login succesful" })
            } else {
                return res.status(401).render("index", { message: "invalid password" })
            }
        } catch (error) {
            console.error("error logging in:", error);
            return res.status(500).send("error logging in");
        }
    });

    router.post("/register", async (req, res) => {
        const { signupEmail, signupPassword } = req.body;

        const existingUser = await users.findOne({ email: signupEmail });
        if (existingUser) {
            return res.status(400).send("user already exists");
        }
        
        try {
            const hashedPassword = await bcrypt.hash(signupPassword, 10);
            const result = await users.insertOne({
                email: signupEmail,
                password: hashedPassword
            });
    
            res.status(201).send("user registered successfully");
        } catch (error) {
            console.error("error registering user:", error);
            res.status(500).send("error registering user");
        }
    });
    return router
}