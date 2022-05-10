// import * as migrations from "./migrations";
import * as entities from "./entities";
import { createConnection, getConnection, QueryRunner, Connection, ConnectionOptions } from "typeorm";

export const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: Object.values(entities),
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

        // await connection.runMigrations();

        return connection.createEntityManager();
    }

    async getQueryRunner(): Promise<QueryRunner> {
        const existingConnection = await this.tryGetExistingConnection();
        if (existingConnection) {
            return existingConnection.createQueryRunner();
        }

        const connection = await createConnection(dbConfig);
        // await connection.runMigrations();

        return connection.createQueryRunner();
    }
}
