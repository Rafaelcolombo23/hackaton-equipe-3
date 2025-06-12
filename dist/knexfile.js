"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: 8889,
            user: 'root',
            password: 'root',
            database: 'hackaton'
        },
        migrations: {
            directory: './src/migrations'
        }
    }
};
exports.default = config;
