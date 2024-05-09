import express from "express"

import { ItemService } from "./items.services"
import { ApiError } from "../error/api"
import { ErrorMessages } from "../error/messages"

const router = express()

router.get("/", (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction) => {
    ItemService.getItems()
    .then((data) => {
        if (!data) {
            return next(ApiError.notFound(ErrorMessages.item.notFound)) 
        } 
        return res.status(200).json(data)
    }).catch((err: ApiError) => {
        return next(ApiError.internal(err.message))
    })
})

export default router