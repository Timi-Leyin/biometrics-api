import {body} from "express-validator"

const loginValidation = [
  body("username","Username is Required").isString().trim(),
  body("email", "Invalid Email").isEmail().normalizeEmail(),
];

export { loginValidation };
