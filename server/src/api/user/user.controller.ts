import { RequestHandler } from "express";
// import { GetUser, Role } from "./user.types";
import { Unauthorized } from "../../utilities/errors";

export const getUser: RequestHandler = async (req, res) => {
    if (!req.user) throw new Unauthorized('User not logged in');
    // const params: GetUser = req.params as unknown as GetUser;

    // if (!params.userId) return res.json(req.user);

    // if (req.user.role === Role.ADMIN) {
        
    // }

    res.json(req.user);
}