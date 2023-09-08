import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
// @REQUEST LOGGER
import { record } from "@reqlog/express"
import errorNotFound from "./middlewares/errorNotFound"


/*  INITIALIZE EXPRESS APP */
const app = express() 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(record(process.env.REQLOG_API_KEY as string))



app.use(errorNotFound)

export default app