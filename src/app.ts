import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
// @REQUEST LOGGER
// import { record } from "@reqlog/express";
import errorNotFound from "./middlewares/errorNotFound";
import login from "./controllers/auth/login";
import {
  addStudentValidation,
  loginValidation,
} from "./utils/validations";
import validate from "./middlewares/validate";
import welcome from "./controllers/welcome";
import addStudent from "./controllers/students/addStudent";
import deleteStudent from "./controllers/students/deleteStudent";
import getStudentById from "./controllers/students/getStudentById";
import getStudents from "./controllers/students/getStudents";
import updateStudent from "./controllers/students/updateStudent";
import uploadAtt from "./controllers/attendance/uploadAtt";
import multer from "multer";
import { record } from "@logdrop/node";
import getAtt from "./controllers/attendance/getAtt";
import deleteAtt from "./controllers/attendance/deleteAtt";
import verifyAdmin from "./middlewares/verifyAdmin";
import uploadStudents from "./controllers/students/uploadStudents";
import getEvents from "./controllers/events/getEvents";
import getMe from "./controllers/profile/getMe";
import dash from "./controllers/profile/dash";

/*  INITIALIZE EXPRESS APP */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// PRODUCTION SPECIFY CODE
if (process.env.ENV_MODE === "production") {
  app.use(record(process.env.REQLOG_API_KEY as string));
}

app.get("/", welcome);
app.post("/login", loginValidation, validate, login);

// STUDENTS
app.get("/students", verifyAdmin, getStudents);
app.get("/student/:id", verifyAdmin, getStudentById);
app.post("/student/upload", verifyAdmin, upload.single("logs"), uploadStudents);
app.post("/student", verifyAdmin, addStudentValidation, validate, addStudent);
app.put("/student/:id", verifyAdmin, updateStudent);
app.delete("/student/:id", verifyAdmin, deleteStudent);

// ATTENDANCE

app.post("/attendance/upload", verifyAdmin, upload.array("logs", 5), uploadAtt);
app.get("/attendance", verifyAdmin, getAtt);
app.delete("/attendance", verifyAdmin, deleteAtt);


// EVENTS
app.get("/events", verifyAdmin, getEvents);


// profile
app.get("/profile", verifyAdmin, getMe);
app.get("/dash", verifyAdmin, dash);

app.use(errorNotFound);

export default app;
