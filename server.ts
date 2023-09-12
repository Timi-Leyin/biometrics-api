import dotenv from "dotenv";
dotenv.config(); // configure the dotenv package
import app from "./src/app";
import db from "./src/config/db";


// create Root User


// import User from "./src/models/User";
// import { encrypt } from "./src/utils/hash";
// import { ROLES } from "./src/config/main";
// (async () => {
//   User.create({
//     username: "originalTimi",
//     email: "originalTimi@duck.go",
//     password: await encrypt("1234"),
//     role: ROLES.admin,
//     root: true,
//   });
// })();


// Sync the model with the database (create the table if it doesn't exist)
db.sync()
  .then(() => {
    console.log("Database and tables are synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

// START SERVER
const PORT = process.env.PORT || process.env.DEV_PORT;
app.listen(PORT, () => console.log(`Server is live at ${PORT}`));
