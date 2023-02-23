import { Movie } from "../database/entities/movie";
import { validMovie, validMovieUpdate } from "../lib/authentication-schema";
import { MoviesQuery, ResponseMessage } from "../lib/types";
import { ArrayContains, EntityManager, Like, Repository } from "typeorm";

export class MovieManager {
    private readonly moviesRepository: Repository<Movie>;

    constructor(private readonly tx: EntityManager) {
        this.moviesRepository = this.tx.getRepository(Movie);
    }

    async getAllMovies(): Promise<Movie[]> {
        return await this.moviesRepository.find();
    }

    async getMovieById(id: string): Promise<Movie | ResponseMessage> {
        const movie: Movie | null = await this.moviesRepository.findOneBy({imdbId: id});

        if (!movie) {
            return {
                status: "404",
                message: "Movie not found",
            };
        }

        return movie;
    }

    async getMoviesByQuery(query: MoviesQuery): Promise<Movie[]> {
        const { actor, genre, imdbSort } = query;

        // const movies = this.moviesRepository.createQueryBuilder("movie");

        // if (actor) {
        //     movies.where("movie.actors LIKE :actor", { actor: `%${actor}%` });
        // }
        // if (genre) {
        //     movies.andWhere(":genre = ANY(movie.genres)", { genre: `${genre}` });
        // }
        // if (imdbSort) {
        //     movies.orderBy("movie.imdbRating", imdbSort);
        // }

        // return movies.getMany();

        return await this.moviesRepository.find({
            where: {
                actors: Like(`%${actor}%`),
                genres: genre && ArrayContains([genre]),
            },
            order: {
                imdbRating: imdbSort,
            },
        });
    }

    async addMovie(movie: Movie): Promise<Movie | ResponseMessage> {
        const { error } = validMovie.validate(movie);
        if (error) {
            return {
                status: "400",
                message: error.details[0].message,
            };
        }

        const existingMovie: Movie | null = await this.moviesRepository.findOneBy({ imdbId: movie.imdbId });
        if (existingMovie) {
            return {
                status: "409",
                message: "Movie already exists",
            };
        }

        try {
            await this.moviesRepository.save(movie);
        } catch (e) {
            return {
                status: "500",
                message: "Failed to add movie",
            };
        }

        return {
            status: "200",
            message: "Movie added successfully",
        };
    }

    async updateMovie(id: string, movie: Movie): Promise<Movie | ResponseMessage> {
        const existingMovie: Movie | null = await this.moviesRepository.findOneBy({ imdbId: id });
        if (!existingMovie) {
            return {
                status: "404",
                message: "Movie not found",
            };
        }
        const { error } = validMovieUpdate.validate(movie);
        if (error) {
            return {
                status: "400",
                message: error.details[0].message,
            };
        }

        try {
            await this.moviesRepository.update(
                {
                    imdbId: id,
                },
                {
                    title: movie.title || existingMovie.title,
                    actors: movie.actors || existingMovie.actors,
                    genres: movie.genres || existingMovie.genres,
                    year: movie.year || existingMovie.year,
                    runtime: movie.runtime || existingMovie.runtime,
                    imdbRating: movie.imdbRating || existingMovie.imdbRating,
                    imdbVotes: movie.imdbVotes || existingMovie.imdbVotes,
                }
            );
        } catch (e) {
            return {
                status: "500",
                message: "Failed to update movie",
            };
        }

        return {
            status: "200",
            message: "Movie updated successfully",
        };
    }

    async deleteMovie(id: string): Promise<Movie | ResponseMessage> {
        const movie: Movie | null = await this.moviesRepository.findOneBy({ imdbId: id });
        if (!movie) {
            return {
                status: "404",
                message: "Movie not found",
            };
        }

        try {
            await this.moviesRepository.remove(movie);
        } catch (e) {
            return {
                status: "500",
                message: "Failed to delete movie",
            };
        }

        return {
            status: "200",
            message: "Movie deleted successfully",
        };
    }
}
