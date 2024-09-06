export class ValidationError extends Error {
  fieldErrors: { fieldName: string; message: string }[];
  status: number;

  constructor(details: { path: any; message: string }[]) {
    super("Validation failed");
    this.fieldErrors = details.map(({ path, message }) => ({
      fieldName: path?.[0],
      message,
    }));
    this.status = 400;
    this.name = 'ValidationError';
  }
}
  
  export class NotFoundError extends Error {
    status: number;
  
    constructor(message: string) {
      super(message);
      this.status = 404;
      this.name = 'NotFoundError';
    }
  }
  
  export class AuthenticateError extends Error {
    status: number;
  
    constructor(message: string) {
      super(message);
      this.status = 401;
      this.name = 'AuthenticateError';
    }
  }
  