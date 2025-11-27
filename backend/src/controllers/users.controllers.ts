import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getAllUsers = async (_:Request, res:Response) => {
  try {
    const users  = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Get all users failed:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}