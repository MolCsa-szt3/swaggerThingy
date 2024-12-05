import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req,res,next)=> {
    try {
        const users = await dbQuery("SELECT * FROM users;")
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})


router.get("/:id", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE id = ?;", [req.params.id]);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});


export default router;