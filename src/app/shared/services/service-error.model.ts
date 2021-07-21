export class ServiceError {
  public code: "cancelled"
    | "unknown"
    | "invalid-argument"
    | "deadline-exceeded"
    | "not-found"
    | "already-exists"
    | "permission-denied"
    | "resource-exhausted"
    | "failed-precondition"
    | "aborted"
    | "out-of-range"
    | "unimplemented"
    | "internal"
    | "unavailable"
    | "data-loss"
    | "unauthenticated";
  public message: string;
  public name: string;
  public stack: string;

  constructor() {
    this.code = "unknown";
    this.name = "";
    this.message = "";
    this.stack = "";
  }
}
