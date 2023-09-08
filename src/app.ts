import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
// @REQUEST LOGGER
import { record } from "@reqlog/express";
import errorNotFound from "./middlewares/errorNotFound";
import login from "./controllers/login";
import { addStudentValidation, loginValidation } from "./utils/validations";
import validate from "./middlewares/validate";
import welcome from "./controllers/welcome";
import addStudent from "./controllers/addStudent";
import deleteStudent from "./controllers/deleteStudent";
import updateStudent from "./controllers/updateStudent";

/*  INITIALIZE EXPRESS APP */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// PRODUCTION SPECIFY CODE
if (process.env.ENV_MODE === "production") {
  app.use(record(process.env.REQLOG_API_KEY as string));
}

app.get("/", welcome);
app.post("/login", loginValidation, validate, login);

app.post("/student", addStudentValidation, validate, addStudent);
app.put("/student/id", addStudentValidation, validate, updateStudent);
app.delete("/student/:id", deleteStudent);

app.use(errorNotFound);

export default app;
