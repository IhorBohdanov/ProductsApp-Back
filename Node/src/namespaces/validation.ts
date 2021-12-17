declare namespace Validation {
  type Error = string;

  type Errors = Array<Error>;

  interface ValidationResult {
    valid: boolean,
    errors: Errors
  }
}
