import express from "express";
import { ENV } from "./lib/env.js"
import clientsRouter from "./routes/clients.route.js";
import usersRouter from "./routes/users.route.js";
import cors from "cors";


const app = express();
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

const PORT = ENV.PORT || 3000;

app.use("/api/clients", clientsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));