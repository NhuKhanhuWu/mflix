/** @format */

// validationFields.ts
import * as yup from "yup";

// Reusable fields
export const emailSchema = yup
  .string()
  .required("Email is required")
  .email("Invalid email format");

export const passwordSchema = yup
  .string()
  .required("Password required")
  .min(8, "Password must have at least 8 characters");

export const passwordConfirmSchema = yup
  .string()
  .required("Password confirm required")
  .oneOf([yup.ref("password")], "Passwords must match");
