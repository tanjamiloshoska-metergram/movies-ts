import { createConnection, getConnection, Connection, ConnectionOptions } from "typeorm";
import { Movie } from "./entities/movie";

export const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "movies_user",
    password: "password",
    database: "Movies",
    synchronize: true,
    logging: true,
    entities: [Movie],
    subscribers: [],
    migrations: [],
};

export class DatabaseConnection {
    constructor() { }

    private async tryGetExistingConnection(): Promise<Connection | null> {
        try {
            const connection = getConnection();
            if (!connection.isConnected) {
                return connection.connect();
            }

            return connection;
        } catch (e) {
            return null;
        }
    }

    async getEntityManager() {
        const existingConnection = await this.tryGetExistingConnection();
        if (existingConnection) {
            return existingConnection.createEntityManager();
        }
        const connection = await createConnection(dbConfig);

        return connection.createEntityManager();
    }
}
