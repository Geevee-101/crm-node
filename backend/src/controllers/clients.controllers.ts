import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const { status, date } = req.query;
    
    // Build filter conditions
    const where: any = {};
    if (status && status !== 'All') {
      where.status = status;
    }
    
    // Filter by date (created on specific date)
    if (date && typeof date === 'string') {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      where.createdAt = {
        gte: startOfDay,
        lte: endOfDay
      };
    }
    
    const clients = await prisma.client.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    
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

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, avatar, status, email, organization, assignedToId } = req.body;
    console.log("Creating client with data:", { name, avatar, status, email, organization, assignedToId });
    await prisma.client.create({
      data: {
        name,
        avatar,
        status,
        email,
        organization,
        assignedToId
      }
    });
    res.status(201).json({ message: "Client created successfully" });
  } catch (error) {
    console.error("Create client failed:", error);
    res.status(500).json({ message: "Failed to create client" });
  }
};

export const updateClientStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!id || !status) {
      return res.status(400).json({ message: "Client ID and status are required" });
    }
    
    await prisma.client.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    
    res.json({ message: "Client status updated successfully" });
  } catch (error) {
    console.error("Update client status failed:", error);
    res.status(500).json({ message: "Failed to update client status" });
  }
};
  