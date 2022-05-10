import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    year!: string;

    @Column()
    runtime!: string;

    @Column()
    imdbRating!: string;

    @Column()
    imdbVotes!: string;
}
