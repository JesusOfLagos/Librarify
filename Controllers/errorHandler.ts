import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

// Error handler middleware
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Internal Server Error";

  // Check if it's a known error (AppError) with a specific status code and message
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(err);

  // Send the error response to the client
  res.status(statusCode).json({ error: message });
}

export { AppError, errorHandler };
