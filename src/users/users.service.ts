import db from "../db"
import { ApiError } from "../error/api"
import { ErrorMessages } from "../error/messages"
import { SuccessMessages } from "../configs/successMessages"

export class UserService {
    static create(balance: number) {
        if (typeof balance !== "number") {
            throw new ApiError(ErrorMessages.user.balance, 400)
        }
        return db.query("INSERT INTO users (balance) values ($1)", [balance])
    }

    static async debit(id: string, amount: number) {
        const user = (await this.getOneUser(id))?.rows[0]
        if ( !user ) {
            throw new ApiError(ErrorMessages.user.notFound, 404)
        }

        const currentBalance = user.balance
        if ( typeof amount !== "number" ) {
            throw new ApiError(ErrorMessages.user.balance, 400)
        }

        if ( currentBalance < amount ) {
            throw new ApiError(ErrorMessages.user.insufficient, 400)
        }

        const newBalance = currentBalance - amount
        await db.query("UPDATE users SET balance = $1 WHERE id = $2", [newBalance, id])

        return { message: SuccessMessages.user.debit }
    }

    static getUsers() {
        return db.query("SELECT * FROM users")
    }

    static getOneUser(id: string) {
        return db.query("SELECT * FROM users WHERE id = $1", [id])
    }
}