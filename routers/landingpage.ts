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
        res.render("index")
    });

    router.get("/login", (req, res) => {
        res.render("login")
    });

    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        console.log(username, password)
    
        try {
            const user = await users.findOne({ username });
            if (!user) {
                return res.status(404).json({ success: false, message: "Gebruiker niet gevonden" });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return res.status(200).render("selection");
            } else {
                return res.status(401).json({ success: false, message: "Onjuist wachtwoord" });
            }
        } catch (error) {
            console.error("Fout bij inloggen:", error);
            return res.status(500).json({ success: false, message: "Fout bij inloggen" });
        }
    });

    router.post("/forgot-password", async (req, res) => {
        const { userEmail } = req.body;
        
        try {
            const user = await users.findOne({ email: userEmail });
            if (!user) {
                return res.status(404).send("email bestaat niet");
            }
            
            const resetToken = uuidv4();
            const resetTokenExpiration = new Date(Date.now() + 300000);

            await users.updateOne(
                { email: userEmail },
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
                text: `niet op klikken! http://localhost:3000/?token=${resetToken}`,
                html: `<p>niet op klikken! <a href="http://localhost:3000/?token=${resetToken}">mag niet</a></p>`
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
        const { signupUsername, signupEmail, signupPassword, repeatPassword } = req.body;
        console.log(signupUsername, signupEmail, signupPassword, repeatPassword);
        
        try {
            if (!signupUsername || !signupEmail || !signupPassword) {
                return res.status(400).json({ success: false, message: "Alle velden zijn verplicht" });
            }
    
            const existingEmailUser = await users.findOne({ email: signupEmail });
            if (existingEmailUser) {
                return res.status(400).json({ success: false, message: "E-mail is al in gebruik" });
            }
    
            const existingUsernameUser = await users.findOne({ username: signupUsername });
            if (existingUsernameUser) {
                return res.status(400).json({ success: false, message: "Gebruikersnaam is al in gebruik" });
            }
            
            const hashedPassword = await bcrypt.hash(signupPassword, 10);
            
            const result = await users.insertOne({
                username: signupUsername,
                email: signupEmail,
                password: hashedPassword,
                registered: new Date()
            });
    
            res.status(201).json({ success: true, message: "Gebruiker succesvol geregistreerd" });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ success: false, message: "Fout bij registreren van gebruiker" });
        }
    });
    
    return router;
}