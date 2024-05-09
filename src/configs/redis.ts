import Redis from "ioredis"

let port = 6379 
if ( process.env.REDIS_PORT !== undefined ) {
    port = parseInt(process.env.REDIS_PORT)
}

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: port,
    maxRetriesPerRequest: 3
}) 

export default redis