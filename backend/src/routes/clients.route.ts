import express, { Router } from "express";
import { getAllClients, getClientDetail } from "../controllers/clients.controllers.js";

const router: Router = express.Router();

router.get("/list", getAllClients);
router.get("/:id", getClientDetail);

export default router;