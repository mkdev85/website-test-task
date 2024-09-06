import Joi, { Schema, ValidationResult } from 'joi';
import { AuthenticateError, NotFoundError, ValidationError } from "./error";

interface JoiFieldsValidatorParams<T> {
  schema: Schema;
  fields: T;
}

export const joiFieldsValidator = <T>({ schema, fields }: JoiFieldsValidatorParams<T>): Joi.ValidationError | undefined => {
  const { error }: ValidationResult<T> = schema.validate(fields, { abortEarly: false });
  return error;
};

// Todo: Optimize the code
export const mapErrorToErrorType = (error: unknown): Error => {
  if (error instanceof ValidationError || 
      error instanceof NotFoundError || 
      error instanceof AuthenticateError) {
    return error; // Return the known error as is
  }
  // Handle unknown errors or wrap in a generic error
  return new Error('An unexpected error occurred');
};

