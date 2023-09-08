import {body} from "express-validator"

const loginValidation = [
  body("username","Username is Required").isString().trim(),
  body("password", "Password is Required").isString().trim()
];

export { loginValidation };
