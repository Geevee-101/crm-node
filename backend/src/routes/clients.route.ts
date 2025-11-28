import express, { Router } from "express";
import { getAllClients, getClientDetail, createClient, updateClientStatus } from "../controllers/clients.controllers.js";

const router: Router = express.Router();

router.get("/list", getAllClients);
router.get("/:id", getClientDetail);

router.post("/create", createClient);
router.put("/:id/status", updateClientStatus);

export default router;