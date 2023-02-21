import { ApplicationError } from "protocols";

export function unauthorizedError(): ApplicationError {
    return {
      name: "UnauthorizedError",
      message: "You must be signed in to continue",
    };
}

export function notFoundError(): ApplicationError {
  return{
    name: "NotFoundError",
    message: "Content not found"
  }
}

export function conflictError(): ApplicationError {
  return{
    name: "conflictError",
    message: "Title already exists"
  }
}