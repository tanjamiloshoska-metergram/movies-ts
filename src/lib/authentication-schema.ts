import Joi from "joi";

export const validMovie = Joi.object({
    imdbId: Joi.string().required(),
    title: Joi.string().required(),
    actors: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).required(),
    year: Joi.number().required(),
    runtime: Joi.number().min(5).required(),
    imdbRating: Joi.number().precision(1).min(0).max(10).required(),
    imdbVotes: Joi.number().required(),
});

export const validMovieUpdate = Joi.object({
    title: Joi.string().optional(),
    actors: Joi.string().optional(),
    genres: Joi.array().items(Joi.string()).optional(),
    year: Joi.number().optional(),
    runtime: Joi.number().min(5).optional(),
    imdbRating: Joi.number().precision(1).min(0).max(10).optional(),
    imdbVotes: Joi.number().optional(),
});
