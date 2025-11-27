import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getAllClients = async (_: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    res.json(clients);
  } catch (error) {
    console.error("Get all clients failed:", error);
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};

export const getClientDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id?: string };
    if (!id) {
      return res.status(400).json({ message: "Client ID is required" });
    }
    const clientId = parseInt(id);
    if (isNaN(clientId)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    console.error("Get client detail failed:", error);
    res.status(500).json({ message: "Failed to fetch client" });
  }
};
  