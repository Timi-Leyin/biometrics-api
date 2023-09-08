import dotenv from "dotenv"
import app from "./src/app";
import db from "./src/config/db";
dotenv.config(); // configure the dotenv package

// Sync the model with the database (create the table if it doesn't exist)
db.sync()
  .then(() => {
    console.log('Database and tables are synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

// START SERVER
const PORT = process.env.PORT || process.env.DEV_PORT
app.listen(PORT, ()=> console.log(`Server is live at ${PORT}`))