import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryColumn()
    imdbId!: string;

    @Column()
    title!: string;

    @Column()
    actors!: string;

    @Column("text", { array: true })
    genres!: string[];

    @Column()
    year!: string;

    @Column()
    runtime!: number;

    @Column()
    imdbRating!: number;

    @Column()
    imdbVotes!: number;
}
