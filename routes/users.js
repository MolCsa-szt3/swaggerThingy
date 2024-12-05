import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req,es,next)=> {
    try {
        const users = await dbQuery("SELECT * FROM users;")
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})


export default router;