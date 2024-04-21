import express from "express";
import bcrypt from 'bcrypt';
import { client } from "../index";
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

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
                return res.status(200).render("selection")
            } else {
                return res.status(401).send("<h1>Penis Pump</h1>")
            }
        } catch (error) {
            console.error("error logging in:", error);
            return res.status(500).send("error logging in");
        }
    });

    router.post("/forgot-password", async (req, res) => {
        const { loginEmail } = req.body;
        
        try {
            const user = await users.findOne({ email: loginEmail });
            if (!user) {
                return res.status(404).send("email bestaat niet");
            }
            
            const resetToken = uuidv4();
            const resetTokenExpiration = new Date(Date.now() + 300000);

            await users.updateOne(
                { email: loginEmail },
                { $set: { resetToken, resetTokenExpiration } }
            );

            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "vandenkieboom1996@gmail.com",
                    pass: "kltr ofzv bfvj jrgf"
                }
            });

            const mailOptions = {
                from: '"Fellowship of the Code" <vandenkieboom1996@gmail.com>',
                to: user.email,
                subject: "wachtwoord herstellen",
                text: `niet op klikken! https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
                html: `<p>niet op klikken! <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">mag niet</a></p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("error sending email:", error);
                    return res.status(500).send("error sending email");
                }
                console.log("email sent:", info.response);
                res.status(200).send("password reset email sent");
            });
        } catch (error) {
            console.error("error requesting password reset:", error);
            res.status(500).send("error requesting password reset");
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