import express from "express"

import { UserService } from "./users.service"
import { ApiError } from "../error/api"
import { ErrorMessages } from "../error/messages"
import { SuccessMessages } from "../configs/successMessages"

const router = express()

router.post("/create", (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
    UserService.create(req.body.balance)
    .then((data) => {
        if (!data) {
            return next(ApiError.notFound(ErrorMessages.user.create)) 
        } 
        return res.status(201).json({message: SuccessMessages.user.create})
    }).catch((err: ApiError) => {
        return next(ApiError.internal(err.message))
    })
})

router.patch("/:id/debit", (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
        UserService.debit(req.params.id, req.body.amount)
        .then((data) => {
            return res.status(200).json({ message: data.message })
        }).catch((err) => {
            if (err instanceof ApiError) {
                return next(err)
            } else {
                return next(ApiError.internal(err.message))
            }
        })
    })

router.get("/", (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
    UserService.getUsers()
    .then((data) => {
        if (data.rows.length === 0) {
            return next(ApiError.notFound(ErrorMessages.user.notFound)) 
        }
        return res.status(200).json(data.rows)
    }).catch((err: ApiError) => {
        console.log(err.message)
        return next(ApiError.internal(err.message))
    })
})


export default router