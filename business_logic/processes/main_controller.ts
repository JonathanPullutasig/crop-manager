import { Request, Response } from "express";

export const showMain = (req: Request, res: Response) => {
    res.render('main');
}