import express from "express"
import routes from "./routes-config"
import errorHandler from "./middleware/errorHandler"
import { config } from "dotenv"
config()

const app = express()

app.use(express.json())
app.use("/api", routes)
app.use(errorHandler)
const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
    console.log("Server is running")
})