import { Pool } from "pg"
import { config } from "dotenv";
config()

let port = 5432 
if ( process.env.DB_PORT !== undefined ) {
    port = parseInt(process.env.DB_PORT)
}

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: port,
});

export default pool