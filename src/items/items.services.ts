import axios from "axios"
import { removeCircularReferences } from "../configs/removeCircularReferences"
import redis from "../configs/redis"

export class ItemService {
    static async getItems() {
        const cachedData = await redis.get("items")
        if ( cachedData ) {
            return JSON.parse(cachedData)
        }
        let url = ""
        if (typeof process.env.SHOP_URL === "string") {
            url = process.env.SHOP_URL
        }
        let circularData = await axios.get(url)
        const data = removeCircularReferences(circularData.data)
        redis.setex("items", 120, JSON.stringify(data))
        return data
    }
}