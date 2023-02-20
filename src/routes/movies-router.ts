import express, { Request, Response } from "express";
import { EntityManager } from "typeorm";
import { wrap } from "../lib/error-handler";
import { MovieManager } from "../controllers/movies-controller";

const router = express.Router();

router.get(
    "/",
    wrap((_req: Request, _res: Response, tx: EntityManager) => {
        if(Object.keys(_req.query).length > 0)
            return new MovieManager(tx).getMoviesByQuery(_req.query);
        return new MovieManager(tx).getAllMovies();
    })
);

router.post(
    "/",
    wrap((req: Request, _res: Response, tx: EntityManager) => {
        return new MovieManager(tx).addMovie(req.body);
    })
);

router.get(
    "/:id",
    wrap((req: Request, _res: Response, tx: EntityManager) => {
        return new MovieManager(tx).getMovieById(req.params.id);
    })
);

router.put(
    "/:id",
    wrap((req: Request, _res: Response, tx: EntityManager) => {
        return new MovieManager(tx).updateMovie(req.params.id, req.body);
    })
);

router.delete(
    "/:id",
    wrap((req: Request, _res: Response, tx: EntityManager) => {
        return new MovieManager(tx).deleteMovie(req.params.id);
    })
);

export default router;
