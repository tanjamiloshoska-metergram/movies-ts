import express from "express";
import MoviesRouter from "./routes/movies-router";
import { DatabaseConnection } from "./database/connection";

const app = express();
const port=3000;

app.use(express.json());
app.use("/movies", MoviesRouter);

async function startServer() {
    await new DatabaseConnection().getEntityManager();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();
