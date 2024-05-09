import express from "express"
const router = express()

import UsersController from "./users/users.controller"
import ItemsController from "./items/items.controllers"

router.use("/users", UsersController)
router.use("/items", ItemsController)

export default router