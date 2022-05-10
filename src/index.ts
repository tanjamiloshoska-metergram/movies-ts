import express from "express";
import HTTP from "http-status-codes";
import MoviesRouter from "./routes/movies";
import { config } from "./config";
import { DatabaseConnection } from "./database/connection";

const app = express();

app.use(express.json());

app.get("/", (_, res) =>
    res.status(200).json({
        message: HTTP.getStatusText(HTTP.OK),
        status: HTTP.OK
    })
);

app.use("/movies", MoviesRouter);

async function startServer() {
    // test db connection
    await new DatabaseConnection().getEntityManager();
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
}

startServer();
