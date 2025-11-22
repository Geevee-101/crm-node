import express, { Router } from "express";

const router: Router = express.Router();

router.get("/list", (req, res) => {
 res.send("Clients endpoint");
});

export default router;