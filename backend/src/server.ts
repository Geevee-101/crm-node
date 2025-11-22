import express from "express";
import { ENV } from "./lib/env.js"
import clientsRouter from "./routes/clients.route.js";


const app = express ();

const PORT = ENV.PORT || 3000;

app.use("/api/clients", clientsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));