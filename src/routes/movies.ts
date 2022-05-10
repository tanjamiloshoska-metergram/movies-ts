import express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { wrap } from "../lib/error-handler";
import { MovieManager } from "../models/movie-manager";

const router = express.Router();

/**
 * Get all movies
 * Supports filtering by genre, actor and rating
 */
router.get(
    "/",
    wrap((_req: Request, _res: Response, tx: EntityManager) => {
        return new MovieManager(tx).getMovies();
    })
);

/**
 * Get all movies
 * Supports filtering by genre, actor and rating
 */
router.get(
    "/statistics",
    wrap((_req: Request, _res: Response, tx: EntityManager) => {
        return new MovieManager(tx).getMoviesData();
    })
);

export default router;
