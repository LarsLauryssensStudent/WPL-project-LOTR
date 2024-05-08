import { NextFunction, Request, Response } from "express";

export function secureMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect("/login");
    }
};

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const user = req.session.user;
    if (user && user.role === "ADMIN") {
        next();
    } else {
        req.session.message = { type: "error", message: "Access denied: You need to be an admin to access this resource." };
        res.redirect("back");
    }
}