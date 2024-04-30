import express from "express";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { client } from "../database";
import { v4 as uuidv4 } from 'uuid';

export default function landingpageRouter() {
    const router = express.Router();
    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    router.get("/", (req, res) => {
        res.render("index")
        
    });

    router.get("/login", async (req, res) => {
        res.render("login", { 
            usernameError: "", 
            passwordError: "",
            requiredError: ""
        })

        //ffe om te zien wie er in de database zit
        const registeredUsers = await users.find({}).toArray();
        console.log(registeredUsers)
    });

    router.post("/login", async (req, res) => {
        const { username, password } = req.body;

        let errors = {
            usernameError: "",
            passwordError: "",
            requiredError: ""
        };

        //input validatie
        if (!username || !password) {
            errors.requiredError = "Alle velden verplicht";
            return res.status(400).render("login", errors);
        }
    
        try {
            //gebruiker bestaat niet
            const user = await users.findOne({ username });
            if (!user) {
                errors.passwordError = "Gebruikers naam bestaat niet";
                return res.status(404).render("login", errors);
            }
    
            //wachtwoord is fout
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return res.status(200).render("selection");
            } else {
                errors.passwordError = "Wachtwoord is fout";
                return res.status(401).render("login", errors);
            }
        } catch (error) {
            console.error("Fout bij het inloggen:", error);
            return res.status(500).json({ success: false, message: "Fout bij inloggen" });
        }
    });

    router.get("/resetpassword", (req, res) => {
        res.render("resetpassword")
    });
    
    router.get("/forgotpassword", (req, res) => {
        res.render("forgotpassword", { 
            invalidEmailError: "", 
            emailError: "",
            succesMessage: ""
        })
    });

    router.post("/forgot-password", async (req, res) => {
        const { userEmail } = req.body;
        console.log(userEmail)

        let errors = {
            invalidEmailError: "",
            emailError: "",
            succesMessage: ""
        };

        if (!userEmail) {
            errors.invalidEmailError = "Geen geldig e-mailadres";
            return res.status(400).render("forgotpassword", errors);
        }
        
        try {
            const user = await users.findOne({ email: userEmail });
            if (!user) {
                errors.emailError = "E-mailadres bestaat niet";
                return res.status(404).render("forgotpassword", errors);
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
                    user: process.env.AUTH_NAME,
                    pass: process.env.AUTH_PASS
                }
            });

            const mailOptions = {
                from: '"Fellowship of the Code" <vandenkieboom1996@gmail.com>',
                to: user.email,
                subject: "wachtwoord herstellen",
                text: `niet op klikken! http://localhost:3000/resetpassword/?token=${resetToken}`,
                html: `<p>niet op klikken! <a href="http://localhost:3000/resetpassword/?token=${resetToken}">mag niet</a></p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("error sending email:", error);
                    return res.status(500).send("error sending email");
                }
                console.log("email sent:", info.response);
                errors.succesMessage = "Wachtwoord herstel e-mail is verzonden";
                return res.status(200).render("forgotpassword", errors);
            });
        } catch (error) {
            console.error("error requesting password reset:", error);
            res.status(500).send("error requesting password reset");
        }
    });

    router.get("/register", (req, res) => {
        res.render("register", { 
            usernameError: "", 
            emailError: "",
            requiredError: "",
            passwordError: "",
            succesMessage: ""
        })
    });

    router.post("/register", async (req, res) => {
        const { signupUsername, signupEmail, signupPassword, repeatPassword } = req.body;
    
        //error berichten
        let errors = {
            usernameError: "",
            emailError: "",
            requiredError: "",
            passwordError: "",
            succesMessage: ""
        };
    
        //input validatie
        if (!signupUsername || !signupEmail || !signupPassword) {
            errors.requiredError = "Alle velden verplicht";
            return res.status(400).render("register", errors);
        }

        //zien of passwords matchen
        if (signupPassword !== repeatPassword) {
            errors.passwordError = "Wachtwoorden komen niet overeen";
            return res.status(400).render("register", errors);
        }
    
        try {
            //checken of username all bestaat
            const existingUsernameUser = await users.findOne({ username: signupUsername });
            if (existingUsernameUser) {
                errors.usernameError = "Gebruikersnaam bestaat al";
                return res.status(400).render("register", errors);
            }
    
            //zien of email all bestaat
            const existingEmailUser = await users.findOne({ email: signupEmail });
            if (existingEmailUser) {
                errors.emailError = "E-mail is al in gebruik";
                return res.status(400).render("register", errors);
            }
            
            //hash het wachtwoord
            const hashedPassword = await bcrypt.hash(signupPassword, 10);
            
            //gebruiker toevoegen
            const result = await users.insertOne({
                username: signupUsername,
                email: signupEmail,
                password: hashedPassword,
                registered: new Date()
            });
    
            //succes regristratie
            errors.succesMessage = "Gebruiker succesvol geregistreerd";
            return res.status(201).render("register", errors);
        } catch (error) {
            //error handling
            console.error("Error registering user:", error);
            res.status(500).json({ success: false, message: "Fout bij registreren van gebruiker" });
        }
    });
    
    return router;
}