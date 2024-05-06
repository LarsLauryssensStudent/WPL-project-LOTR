// import express from "express";
// import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';
// // import { client } from "../database";
// import { v4 as uuidv4 } from 'uuid';
// import { User } from "../interfaces";

// export default function landingpageRouter() {
//     const router = express.Router();
//     const db = client.db(process.env.DB_NAME);
//     const users = db.collection<User>("users");

//     router.get("/", (req, res) => {
//         res.render("index")
        
//     });

//     router.get("/resetpassword", (req, res) => {
//         res.render("resetpassword")
//     });
    
//     router.get("/forgotpassword", (req, res) => {
//         res.render("forgotpassword", { 
//             invalidEmailError: "", 
//             emailError: "",
//             succesMessage: ""
//         })
//     });

//     router.post("/forgot-password", async (req, res) => {
//         const { userEmail } = req.body;
//         console.log(userEmail)

//         let errors = {
//             invalidEmailError: "",
//             emailError: "",
//             succesMessage: ""
//         };

//         if (!userEmail) {
//             errors.invalidEmailError = "Geen geldig e-mailadres";
//             return res.status(400).render("forgotpassword", errors);
//         }
        
//         try {
//             const user = await users.findOne({ email: userEmail });
//             if (!user) {
//                 errors.emailError = "E-mailadres bestaat niet";
//                 return res.status(404).render("forgotpassword", errors);
//             }
            
//             const resetToken = uuidv4();
//             const resetTokenExpiration = new Date(Date.now() + 300000);

//             await users.updateOne(
//                 { email: userEmail },
//                 { $set: { resetToken, resetTokenExpiration } }
//             );

//             const transporter = nodemailer.createTransport({
//                 service: "gmail",
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false,
//                 auth: {
//                     user: process.env.AUTH_NAME,
//                     pass: process.env.AUTH_PASS
//                 }
//             });

//             const mailOptions = {
//                 from: '"Fellowship of the Code" <vandenkieboom1996@gmail.com>',
//                 to: user.email,
//                 subject: "wachtwoord herstellen",
//                 text: `niet op klikken! http://localhost:3000/resetpassword/?token=${resetToken}`,
//                 html: `<p>niet op klikken! <a href="http://localhost:3000/resetpassword/?token=${resetToken}">mag niet</a></p>`
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error("error sending email:", error);
//                     return res.status(500).send("error sending email");
//                 }
//                 console.log("email sent:", info.response);
//                 errors.succesMessage = "Wachtwoord herstel e-mail is verzonden";
//                 return res.status(200).render("forgotpassword", errors);
//             });
//         } catch (error) {
//             console.error("error requesting password reset:", error);
//             res.status(500).send("error requesting password reset");
//         }
//     });
    
//     return router;
// }