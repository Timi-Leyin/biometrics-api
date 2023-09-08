import dotenv from "dotenv"
import app from "./src/app";
dotenv.config(); // configure the dotenv package



// START SERVER
const PORT = process.env.PORT || process.env.DEV_PORT
app.listen(PORT, ()=> console.log(`Server is live at ${PORT}`))