import express, { Router } from "express";
import { getAllUsers } from "../controllers/users.controllers.js";

const router: Router = express.Router();

router.get("/list", getAllUsers);

export default router;