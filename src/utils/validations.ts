import { body } from "express-validator";

const loginValidation = [
  body("email", "Email is Required").isString().trim().isEmail().withMessage("Invalid Email"),
  body("password", "Password is Required").isString().trim(),
];

const addStudentValidation = [
  body("uuid", "ID is Required").isString().trim(),
  body("name", "Name is Required").isString().trim(),
  body("matric_no", "Matric No is Required").isString().trim(),
  body("department", "Department is Required").isString().trim(),
  body("level", "Level is Required").isString().trim(),
  body("pin", "Pin is Required").isString().isLength({
    min:4
  }).withMessage("Pin Minimum Length is 4").trim(),
];


const uploadAttValidation = [
  body("event", "Event is Required").isString().trim()
];


export { loginValidation, addStudentValidation, uploadAttValidation };
