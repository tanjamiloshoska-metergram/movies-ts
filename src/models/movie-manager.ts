import { EntityManager, Repository } from "typeorm";
import { Movie } from "../database/entities";
import movies from "../movies.json";

export interface GetMoviesQuery {
    actor?: string;
    genre?: string[];
    imdbSort?: string;
}

export class MovieManager {
    private readonly moviesTable: Repository<Movie>;

    constructor(private readonly tx: EntityManager) {
        this.moviesTable = this.tx.getRepository(Movie);
    }

    async getMovies(): Promise<{ entities: Movie[]; total: number }> {
        const [entities, total] = await this.moviesTable.findAndCount();

        return { entities, total };
    }

    getMoviesData() {
        // should be fetched from DB
        // const movies = [{}];
        return {
            totalLengthOfAllMovies: movies.reduce(
                (totalLength, movie) => movie.Runtime !== 'N/A'
                    ? totalLength + parseInt(movie.Runtime)
                    : totalLength,
                0
            ),
            imdbUrls: movies.map((movie) => `https://www.imdb.com/title/${movie.imdbID}`),
            totalImdbVotes: movies.reduce(
                (totalVotes, movie) =>
                    movie.imdbVotes !== 'N/A'
                        ? totalVotes + parseInt(movie.imdbVotes.replace(/[^0-9]/g, ''))
                        : totalVotes,
                0
            ),
            allLanguagues: [...new Set(
                movies.reduce((languages: string[], movie) => languages.concat(movie.Language.split(', ')), [])
            )]
        };
    }

    // Add other Movie related logic below
    // ...
}
